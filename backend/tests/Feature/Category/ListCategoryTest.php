<?php

namespace Tests\Feature\Category;

use Tests\TestCase;

use App\Models\User;
use App\Models\Category;

class ListCategoryTest extends TestCase
{
    private User $user;

    /**
     * Setup the test environment.
     *
     * @return void
     */
    public function setUp(): void
    {
        parent::setUp();

        $this->user = User::factory()->create();
    }

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

    public function testUserCanViewOwnCategories()
    {
        $this->actingAs($this->user);

        Category::factory(3)->create([
            'user_id' => $this->user->id
        ]);

        $response = $this->json('GET', 'api/categories/');

        $response->assertOk();
        $response->assertExactJson($this->user->categories->toArray());
    }
}
