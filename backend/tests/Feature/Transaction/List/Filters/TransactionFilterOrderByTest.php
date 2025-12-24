<?php

namespace Tests\Feature\Transaction\List\Filters;

use App\Models\Category;
use Tests\TestCase;

use App\Models\Transaction;

class TransactionFilterOrderByTest extends TestCase
{
    public function testTryFilterOrderByWithInvalidValue()
    {
        $this->actingAs($this->user);

        $response = $this->json('GET', 'api/transactions', [
            'order_by' => 'unknown column',
        ]);

        $response->assertUnprocessable();
        $response->assertJsonValidationErrors([
            'order_by' => ['O campo order_by deve conter um valor valido.'],
        ]);
    }

    public function testFilterOrderByForCreatedAtColumn()
    {
        $this->actingAs($this->user);

        Category::factory()->for($this->user)
            ->has(Transaction::factory(['created_at' => '2025-01-01 15:00:00']))
            ->has(Transaction::factory(['created_at' => '2025-01-01 00:00:00']))
            ->has(Transaction::factory(['created_at' => '2025-01-03 00:00:00']))
            ->create();

        $response = $this->json('GET', 'api/transactions', [
            'order_by' => 'created_at',
        ]);

        dd($response->json());
    }
}
