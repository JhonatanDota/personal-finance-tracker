<?php

namespace Tests\Feature\Category;

use Tests\TestCase;

use App\Models\Category;

use App\Http\Resources\Category\CategoryResource;

class ListCategoryTest extends TestCase
{
    public function testTryListCategoriesNotLogged(): void
    {
        $response = $this->json('GET', 'api/categories/');

        $response->assertUnauthorized();
    }

    public function testListCategoriesWithUserWithoutCategories(): void
    {
        $this->actingAs($this->user);

        $response = $this->json('GET', 'api/categories/');

        $response->assertOk();
        $response->assertExactJson([]);
    }

    public function testUserCannotListCategoriesFromAnotherUser(): void
    {
        $this->actingAs($this->user);

        $category = Category::factory()->create();

        $this->assertDatabaseHas(Category::class, [
            'id' => $category->id
        ]);

        $response = $this->json('GET', 'api/categories/');

        $response->assertOk();
        $response->assertExactJson([]);
    }

    public function testUserCanViewOwnCategories(): void
    {
        $this->actingAs($this->user);

        Category::factory(5)->create([
            'user_id' => $this->user->id
        ]);

        $response = $this->json('GET', 'api/categories/');

        $response->assertOk();
        $response->assertExactJson(CategoryResource::collection($this->user->categories)->resolve());
    }
}
