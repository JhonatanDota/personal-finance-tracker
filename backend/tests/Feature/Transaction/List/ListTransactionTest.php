<?php

namespace Tests\Feature\Category;

use Tests\TestCase;

use App\Models\Category;
use App\Models\Transaction;

use App\Http\Resources\Transaction\TransactionResource;

class ListTransactionTest extends TestCase
{
    public function testTryListTransactionsNotLogged(): void
    {
        $response = $this->json('GET', 'api/transactions/');

        $response->assertUnauthorized();
    }

    public function testListCategoriesWithUserWithoutCategories(): void
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

    public function testUserCannotListTransactionsFromAnotherUser(): void
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

    public function testUserCanViewOwnTransactions(): void
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
}
