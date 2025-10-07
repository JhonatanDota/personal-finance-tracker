<?php

namespace Tests\Feature\Category;

use Tests\TestCase;

use Tests\Traits\AssertsQueries;

use App\Models\Category;
use App\Models\Transaction;

use App\Http\Resources\Transaction\TransactionResource;

class ListTransactionTest extends TestCase
{
    use AssertsQueries;

    public function testTryListTransactionsNotLogged()
    {
        $response = $this->json('GET', 'api/transactions/');

        $response->assertUnauthorized();
    }

    public function testListTransactionsWithUserWithoutTransactions()
    {
        $this->actingAs($this->user);

        $response = $this->json('GET', 'api/transactions');

        $response->assertOk();
        $response->assertExactJson(
            [
                'data' => [],
                'meta' => [
                    'current_page' => 1,
                    'last_page' => 1,
                    'per_page' => 10,
                    'total' => 0,
                ]
            ]
        );
    }

    public function testUserCannotListTransactionsFromAnotherUser()
    {
        $this->actingAs($this->user);

        $transaction = Transaction::factory()->create();

        $this->assertDatabaseHas(Transaction::class, [
            'id' => $transaction->id
        ]);

        $response = $this->json('GET', 'api/transactions/');

        $response->assertOk();
        $response->assertExactJson([
            'data' => [],
            'meta' => [
                'current_page' => 1,
                'last_page' => 1,
                'per_page' => 10,
                'total' => 0,
            ]
        ]);
    }

    public function testUserCanViewOwnTransactions()
    {
        $this->actingAs($this->user);

        Category::factory(2)
            ->for($this->user)
            ->has(Transaction::factory(2))
            ->create();

        Transaction::factory(3)->create();

        $response = $this->json('GET', 'api/transactions/');

        $response->assertOk();
        $response->assertExactJson([
            'data' => TransactionResource::collection($this->user->transactions)->resolve(),
            'meta' => [
                'current_page' => 1,
                'last_page' => 1,
                'per_page' => 10,
                'total' => 4,
            ]
        ]);
    }

    public function testUserTransactionsPagination()
    {
        $this->actingAs($this->user);

        Category::factory(2)
            ->for($this->user)
            ->has(Transaction::factory(10))
            ->create();

        $expectedTotalTransactions = $this->user->transactions()->count();
        $expectedTransactionsFirstPage = $this->user->transactions()->take(10)->get();

        $response = $this->json('GET', 'api/transactions');
        $response->assertOk();
        $response->assertExactJson([
            'data' => TransactionResource::collection($expectedTransactionsFirstPage)->resolve(),
            'meta' => [
                'current_page' => 1,
                'last_page' => 2,
                'per_page' => 10,
                'total' => $expectedTotalTransactions,
            ]
        ]);

        $expectedTransactionsSecondPage = $this->user->transactions()->skip(10)->take(10)->get();

        $response = $this->json('GET', 'api/transactions', [
            'page' => 2
        ]);

        $response->assertOk();
        $response->assertExactJson([
            'data' => TransactionResource::collection($expectedTransactionsSecondPage)->resolve(),
            'meta' => [
                'current_page' => 2,
                'last_page' => 2,
                'per_page' => 10,
                'total' => $expectedTotalTransactions,
            ]
        ]);
        $response->assertJsonCount(10, 'data');
        $response->assertJsonStructure([
            'data' => [
                '*' => [
                    'id',
                    'category_id',
                    'type',
                    'name',
                    'value',
                    'description',
                    'date',
                    'created_at',
                    'updated_at',
                ]
            ]
        ]);

        $response = $this->json('GET', 'api/transactions', [
            'page' => 3
        ]);

        $response->assertOk();
        $response->assertExactJson([
            'data' => [],
            'meta' => [
                'current_page' => 3,
                'last_page' => 2,
                'per_page' => 10,
                'total' => $expectedTotalTransactions,
            ]
        ]);
    }

    /**
     * Test that listing transactions executes the expected number of database queries.
     *
     * This test ensures that eager loading is being used correctly. By creating multiple
     * categories with transactions and then fetching the transactions via the API,
     * we assert that only the expected number of queries are executed. This helps
     * prevent the N+1 query problem and guarantees that related categories are loaded
     * efficiently alongside transactions.
     */
    public function testListTransactionsDatabaseQueries()
    {
        $this->actingAs($this->user);

        Category::factory(3)
            ->for($this->user)
            ->has(Transaction::factory(5))
            ->create();

        $this->assertDatabaseQueryCount(4, function () {
            $this->json('GET', 'api/transactions');
        });
    }
}
