<?php

namespace Tests\Feature\Transaction\List\Filters;

use Tests\TestCase;

use App\Enums\CategoryTypesEnum;

use App\Models\Category;
use App\Models\Transaction;

use App\Http\Resources\Transaction\TransactionResource;

class TransactionFilterTypeTest extends TestCase
{
    function testTryFilterWithUnknownType()
    {
        $this->actingAs($this->user);

        $response = $this->json('GET', 'api/transactions', [
            'type' => 'unknown',
        ]);

        $response->assertUnprocessable();
        $response->assertJsonValidationErrors([
            'type' => ['O campo type deve conter um valor válido.'],
        ]);
    }

    public function testFilterType()
    {
        $this->actingAs($this->user);

        Category::factory()->for($this->user)->has(Transaction::factory(3))->create([
            'type' => CategoryTypesEnum::INCOME
        ]);

        Category::factory()->for($this->user)->has(Transaction::factory(3))->create([
            'type' => CategoryTypesEnum::EXPENSE
        ]);

        $response = $this->json('GET', 'api/transactions', [
            'type' => CategoryTypesEnum::INCOME,
        ]);

        // Filter INCOME transactions

        $expectedTransactions = $this->user->transactions()->whereHas('category', function ($query) {
            $query->where('type', CategoryTypesEnum::INCOME);
        })->get();
        $expectedData = TransactionResource::collection($expectedTransactions)->resolve();

        $response->assertOk();
        $response->assertExactJson([
            'data' => $expectedData,
            'meta' => [
                'current_page' => 1,
                'last_page' => 1,
                'per_page' => 10,
                'total' => 3,
            ]
        ]);

        // Filter EXPENSE transactions

        $response = $this->json('GET', 'api/transactions', [
            'type' => CategoryTypesEnum::EXPENSE,
        ]);

        $expectedTransactions = $this->user->transactions()->whereHas('category', function ($query) {
            $query->where('type', CategoryTypesEnum::EXPENSE);
        })->get();
        $expectedData = TransactionResource::collection($expectedTransactions)->resolve();

        $response->assertOk();
        $response->assertExactJson([
            'data' => $expectedData,
            'meta' => [
                'current_page' => 1,
                'last_page' => 1,
                'per_page' => 10,
                'total' => 3,
            ]
        ]);
    }
}
