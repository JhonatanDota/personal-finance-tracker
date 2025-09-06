<?php

namespace Tests\Feature\Category;

use Tests\TestCase;

use App\Models\Category;
use App\Models\Transaction;

use App\Http\Resources\Transaction\TransactionResource;

class ListTransactionTest extends TestCase
{
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
                    'per_page' => 15,
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
                'per_page' => 15,
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
                'per_page' => 15,
                'total' => 4,
            ]
        ]);
    }

    public function testUserTransactionsPagination()
    {
        $this->actingAs($this->user);

        Category::factory(2)
            ->for($this->user)
            ->has(Transaction::factory(15))
            ->create();

        $expectedTotalTransactions = $this->user->transactions()->count();
        $expectedTransactionsFirstPage = $this->user->transactions()->take(15)->get();

        $response = $this->json('GET', 'api/transactions');
        $response->assertOk();
        $response->assertExactJson([
            'data' => TransactionResource::collection($expectedTransactionsFirstPage)->resolve(),
            'meta' => [
                'current_page' => 1,
                'last_page' => 2,
                'per_page' => 15,
                'total' => $expectedTotalTransactions,
            ]
        ]);

        $expectedTransactionsSecondPage = $this->user->transactions()->skip(15)->take(15)->get();

        $response = $this->json('GET', 'api/transactions', [
            'page' => 2
        ]);

        $response->assertOk();
        $response->assertExactJson([
            'data' => TransactionResource::collection($expectedTransactionsSecondPage)->resolve(),
            'meta' => [
                'current_page' => 2,
                'last_page' => 2,
                'per_page' => 15,
                'total' => $expectedTotalTransactions,
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
                'per_page' => 15,
                'total' => $expectedTotalTransactions,
            ]
        ]);
    }
}
