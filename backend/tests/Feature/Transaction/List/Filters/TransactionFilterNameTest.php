<?php

namespace Tests\Feature\Transaction\Filters;

use Tests\TestCase;

use Illuminate\Support\Str;

use App\Models\Category;
use App\Models\Transaction;

use App\Http\Resources\Transaction\TransactionResource;

class TransactionFilterNameTest extends TestCase
{
    public function testTryFilterNameWithTooLongName()
    {
        $this->actingAs($this->user);

        $response = $this->json('GET', 'api/transactions', [
            'name' => Str::random(Transaction::NAME_MAX_LENGTH + 1),
        ]);

        $response->assertUnprocessable();
        $response->assertJsonValidationErrors([
            'name' => ['O campo name deve ter no máximo ' . Transaction::NAME_MAX_LENGTH .  ' caracteres.'],
        ]);
    }

    public function testTryFilterNameWithNameNotString()
    {
        $this->actingAs($this->user);

        $response = $this->json('GET', 'api/transactions', [
            'name' => 999,
        ]);

        $response->assertUnprocessable();
        $response->assertJsonValidationErrors([
            'name' => ['O campo name deve ser uma string.'],
        ]);
    }

    public function testFilterNameWithNullName()
    {
        $this->actingAs($this->user);

        Category::factory(3)
            ->for($this->user)
            ->has(Transaction::factory(2))
            ->create();

        $response = $this->json('GET', 'api/transactions', [
            'name' => null,
        ]);

        $response->assertOk();
        $response->assertExactJson([
            'data' => TransactionResource::collection($this->user->transactions)->resolve(),
            'meta' => [
                'current_page' => 1,
                'last_page' => 1,
                'per_page' => 10,
                'total' => 6,
            ]
        ]);
    }

    public function testFilterNameWithNoMatches()
    {
        $this->actingAs($this->user);

        Category::factory(3)
            ->for($this->user)
            ->has(Transaction::factory(2))
            ->create();

        $response = $this->json('GET', 'api/transactions', [
            'name' => 'super secret transaction',
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

    public function testFilterName()
    {
        $this->actingAs($this->user);

        $findable = Transaction::factory()
            ->for(Category::factory()->for($this->user))
            ->state(['name' => 'fiNdAble'])
            ->create();

        Category::factory()
            ->for($this->user)
            ->has(Transaction::factory(2)->sequence(
                ['name' => 'test transaction 1'],
                ['name' => 'test transaction 2']
            ))
            ->create();

        $response = $this->json('GET', 'api/transactions', [
            'name' => 'indabl',
        ]);

        $response->assertOk();
        $response->assertExactJson([
            'data' => [
                TransactionResource::make(Transaction::find($findable->id))->resolve() // Need to find transaction with refreshed data from DB
            ],
            'meta' => [
                'current_page' => 1,
                'last_page' => 1,
                'per_page' => 10,
                'total' => 1,
            ]
        ]);
    }
}
