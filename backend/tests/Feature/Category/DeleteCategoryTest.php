<?php

namespace Tests\Feature\Category;

use Tests\TestCase;

use App\Models\Category;
use App\Models\Transaction;

class DeleteCategoryTest extends TestCase
{
    public function testDeleteCategoryNotLogged()
    {
        $category = Category::factory()->create();

        $response = $this->json('DELETE', 'api/categories/ ' . $category->id);

        $response->assertUnauthorized();
    }

    public function testeTryDeleteUnknownCategory()
    {
        $this->actingAs($this->user);

        $unknownCategoryId = Category::max('id') + 1;

        $response = $this->json('DELETE', 'api/categories/' . $unknownCategoryId);

        $response->assertNotFound();
    }

    public function testTryRemoveCategoryFromAnotherUser()
    {
        $this->actingAs($this->user);

        $category = Category::factory()->create();

        $response = $this->json('DELETE', 'api/categories/' . $category->id);

        $response->assertForbidden();
    }

    public function testDeleteCategorySuccessfully()
    {
        $this->actingAs($this->user);

        $category = Category::factory()->for($this->user)->has(Transaction::factory(3))->create();

        $this->assertDatabaseHas(Category::class, [
            'id' => $category->id
        ]);

        $this->assertDatabaseHas(Transaction::class, [
            'category_id' => $category->id
        ]);

        $response = $this->json('DELETE', 'api/categories/' . $category->id);

        $response->assertNoContent();

        $this->assertDatabaseMissing(Category::class, [
            'id' => $category->id
        ]);

        $this->assertDatabaseMissing(Transaction::class, [
            'category_id' => $category->id
        ]);
    }
}
