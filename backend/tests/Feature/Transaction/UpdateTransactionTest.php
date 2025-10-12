<?php

namespace Tests\Feature\Transaction;

use Tests\TestCase;

use App\Models\Category;
use App\Models\Transaction;

class UpdateTransactionTest extends TestCase
{
    public function testTryUpdateTransactionNotLogged()
    {
        $transaction = Transaction::factory()->for(Category::factory()->for($this->user))->create();

        $response = $this->json('PATCH', 'api/transactions/' . $transaction->id);

        $response->assertUnauthorized();
    }

    public function testTryUpdateUnknownTransaction()
    {
        $this->actingAs($this->user);

        $unknownTransactionId = Transaction::max('id') + 1;

        $response = $this->json('PATCH', 'api/categories/' . $unknownTransactionId);

        $response->assertNotFound();
    }

    public function testTryUpdateTransactionFromAnotherUser()
    {
        $this->actingAs($this->user);

        $transaction = Transaction::factory()->create();

        $response = $this->json('PATCH', 'api/transactions/' . $transaction->id);

        $response->assertForbidden();
    }

    public function testUpdateTransactionWithoutData()
    {
        $this->actingAs($this->user);

        $transaction = Transaction::factory()->for(Category::factory()->for($this->user))->create();

        $response = $this->json('PATCH', 'api/transactions/' . $transaction->id);

        $response->assertOk();
    }
}
