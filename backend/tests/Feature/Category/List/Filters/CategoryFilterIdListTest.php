<?php

namespace Tests\Feature\Category\List;

use Tests\TestCase;

use App\Models\Category;

use App\Http\Resources\Category\CategoryResource;

class CategoryFilterIdListTest extends TestCase
{

    public function testFilterIdListWithEmptyArrayMustReturnAllCategoriesFromUser(): void
    {
        $this->actingAs($this->user);

        // Create some random categories from another users
        Category::factory(3)->create();

        $categories = Category::factory(3)->for($this->user)->create();

        $response = $this->json('GET', 'api/categories', [
            'ids' => [],
        ]);

        $response->assertOk();
        $response->assertJsonCount($categories->count());
    }

    public function testTryFilterIdListWithInvalidParameterType(): void
    {
        $this->actingAs($this->user);

        $response = $this->json('GET', 'api/categories', [
            'ids' => 'invalid',
        ]);

        $response->assertUnprocessable();
        $response->assertJsonValidationErrors([
            'ids' => ['O campo ids deve ser um array.'],
        ]);

        $response = $this->json('GET', 'api/categories', [
            'ids' => 99,
        ]);

        $response->assertUnprocessable();
        $response->assertJsonValidationErrors([
            'ids' => ['O campo ids deve ser um array.'],
        ]);
    }

    public function testTryFilterIdListWithInvalidArrayData(): void
    {
        $this->actingAs($this->user);

        $response = $this->json('GET', 'api/categories', [
            'ids' => ['invalid'],
        ]);

        $response->assertUnprocessable();
        $response->assertJsonValidationErrors([
            'ids.0' => ['O campo ids deve ser composto por um array de inteiros.'],
        ]);

        $response = $this->json('GET', 'api/categories', [
            'ids' => [[]],
        ]);

        $response->assertUnprocessable();
        $response->assertJsonValidationErrors([
            'ids.0' => ['O campo ids deve ser composto por um array de inteiros.'],
        ]);
    }

    public function testTryFilterIdListWithCategoryIdFromAnotherUserMustNotReturnCategory(): void
    {
        $this->actingAs($this->user);

        $categoriesFromUser = Category::factory(3)->for($this->user)->create();
        $categoryFromAnotherUser = Category::factory()->create();

        $response = $this->json('GET', 'api/categories', [
            'ids' => array_merge(
                [$categoryFromAnotherUser->id],
                $categoriesFromUser->pluck('id')->toArray()
            ),
        ]);

        $response->assertOk();
        $response->assertJsonCount($categoriesFromUser->count());
    }

    public function testFilterIdListSuccessfully(): void
    {
        $this->actingAs($this->user);

        $categoriesFromUser = Category::factory(3)->for($this->user)->create();

        $response = $this->json('GET', 'api/categories', [
            'ids' => [$categoriesFromUser->first()->id],
        ]);

        $response->assertOk();
        $response->assertJsonCount(1);
        $response->assertJson([CategoryResource::make($categoriesFromUser->first())->resolve()]);
    }
}
