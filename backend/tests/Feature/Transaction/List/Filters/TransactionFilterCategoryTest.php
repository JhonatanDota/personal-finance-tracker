<?php

namespace Tests\Feature\Transaction\Filters;

use Tests\TestCase;

use App\Models\Category;
use App\Models\Transaction;

use App\Http\Resources\Transaction\TransactionResource;

class TransactionFilterCategoryTest extends TestCase
{
    public function testFilterCategoryWithNullCategory()
    {
        $this->actingAs($this->user);

        Category::factory(2)
            ->for($this->user)
            ->has(Transaction::factory(2))
            ->create();

        $response = $this->json('GET', 'api/transactions', [
            'category_id' => null,
        ]);

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

    public function testFilterCategoryWithEmptyCategory()
    {
        $this->actingAs($this->user);

        Category::factory(2)
            ->for($this->user)
            ->has(Transaction::factory(2))
            ->create();

        $response = $this->json('GET', 'api/transactions', [
            'category_id' => '',
        ]);

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

    public function testTryFilterCategoryWithString()
    {
        $this->actingAs($this->user);

        $response = $this->json('GET', 'api/transactions', [
            'category_id' => 'just a string',
        ]);

        $response->assertUnprocessable();
        $response->assertJsonValidationErrors([
            'category_id' => ['O campo category_id deve ser um inteiro.']
        ]);
    }

    public function testTryFilterCategoryWithFloat()
    {
        $this->actingAs($this->user);

        $response = $this->json('GET', 'api/transactions', [
            'category_id' => 999.99,
        ]);

        $response->assertUnprocessable();
        $response->assertJsonValidationErrors([
            'category_id' => ['O campo category_id deve ser um inteiro.']
        ]);
    }

    public function testFilterCategoryWithUnknownCategory()
    {
        $this->actingAs($this->user);

        Category::factory(2)
            ->for($this->user)
            ->has(Transaction::factory(2))
            ->create();

        $response = $this->json('GET', 'api/transactions', [
            'category_id' => Category::max('id') + 1,
        ]);

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

    public function testTryFilterCategoryFromAnotherUser()
    {
        $this->actingAs($this->user);

        Category::factory(2)
            ->for($this->user)
            ->has(Transaction::factory(2))
            ->create();

        $categoryFromAnotherUser = Category::factory()->has(Transaction::factory(2))->create();

        $response = $this->json('GET', 'api/transactions', [
            'category_id' => $categoryFromAnotherUser->id,
        ]);

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

    public function testFilterCategory()
    {
        $this->actingAs($this->user);

        $category = Category::factory()->for($this->user)->has(Transaction::factory(3))->create();

        Category::factory(3)->for($this->user)->has(Transaction::factory(3))->create();

        $response = $this->json('GET', 'api/transactions', [
            'category_id' => $category->id,
        ]);

        $this->assertGreaterThan(3, $this->user->transactions()->count());
        $response->assertOk();
        $response->assertExactJson([
            'data' => TransactionResource::collection($category->transactions)->resolve(),
            'meta' => [
                'current_page' => 1,
                'last_page' => 1,
                'per_page' => 10,
                'total' => 3,
            ]
        ]);
    }
}
