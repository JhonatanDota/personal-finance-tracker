<?php

namespace Tests\Feature\Transaction;

use Tests\TestCase;

use App\Http\Resources\Transaction\TransactionResource;

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

    // =========================================================================
    // CATEGORY_ID
    // =========================================================================

    public function testTryUpdateCategoryIdWithNull()
    {
        $this->actingAs($this->user);

        $transaction = Transaction::factory()->for(Category::factory()->for($this->user))->create();

        $response = $this->json('PATCH', 'api/transactions/' . $transaction->id, [
            'category_id' => null
        ]);

        $response->assertUnprocessable();

        $response->assertJsonValidationErrors([
            'category_id' => ['O campo category_id deve ser um inteiro.'],
        ]);
    }

    public function testTryUpdateCategoryIdWithUnknownCategory()
    {
        $this->actingAs($this->user);

        $transaction = Transaction::factory()->for(Category::factory()->for($this->user))->create();

        $response = $this->json('PATCH', 'api/transactions/' . $transaction->id, [
            'category_id' => Category::max('id') + 1
        ]);

        $response->assertUnprocessable();

        $response->assertJsonValidationErrors([
            'category_id' => ['O valor informado para o campo category_id não existe.'],
        ]);
    }

    public function testTryUpdateCategoryIdWithStringValue()
    {
        $this->actingAs($this->user);

        $transaction = Transaction::factory()->for(Category::factory()->for($this->user))->create();

        $response = $this->json('PATCH', 'api/transactions/' . $transaction->id, [
            'category_id' => 'test'
        ]);

        $response->assertUnprocessable();

        $response->assertJsonValidationErrors([
            'category_id' => ['O campo category_id deve ser um inteiro.'],
        ]);
    }

    public function testTryUpdateCategoryIdWithCategoryFromAnotherUser()
    {
        $this->actingAs($this->user);

        $transaction = Transaction::factory()->for(Category::factory()->for($this->user))->create();

        $response = $this->json('PATCH', 'api/transactions/' . $transaction->id, [
            'category_id' => Category::factory()->create()->id
        ]);

        $response->assertUnprocessable();

        $response->assertJsonValidationErrors([
            'category_id' => ['O valor informado para o campo category_id não existe.'],
        ]);
    }

    public function testUpdateCategoryIdSuccessfully()
    {
        $this->actingAs($this->user);

        $category = Category::factory()->for($this->user)->create();
        $transaction = Transaction::factory()->for(Category::factory()->for($this->user))->create();

        $this->assertDatabaseHas(Transaction::class, [
            'id' => $transaction->id,
            'category_id' => $transaction->category_id,
        ]);

        $response = $this->json('PATCH', 'api/transactions/' . $transaction->id, [
            'category_id' => $category->id
        ]);

        $response->assertOk();
        $response->assertExactJson(TransactionResource::make(Transaction::find($transaction->id))->resolve());

        $this->assertDatabaseHas(Transaction::class, [
            'id' => $transaction->id,
            'category_id' => $category->id,
        ]);
    }
}
