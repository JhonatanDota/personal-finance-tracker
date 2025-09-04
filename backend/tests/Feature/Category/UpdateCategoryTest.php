<?php

namespace Tests\Feature\Category;

use Tests\TestCase;

use Illuminate\Support\Str;

use App\Models\User;
use App\Models\Category;

class UpdateCategoryTest extends TestCase
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

    public function testTryUpdateCategoryNotLogged()
    {
        $category = Category::factory()->create([
            'user_id' => $this->user->id
        ]);

        $response = $this->json('PATCH', 'api/categories/' . $category->id);

        $response->assertUnauthorized();
    }

    public function testTryUpdateUnknownCategory()
    {
        $this->actingAs($this->user);

        $response = $this->json('PATCH', 'api/categories/0');

        $response->assertNotFound();
    }

    public function testTryUpdateCategoryFromAnotherUser()
    {
        $this->actingAs($this->user);

        $category = Category::factory()->create();

        $response = $this->json('PATCH', 'api/categories/' . $category->id);

        $response->assertForbidden();
    }

    public function testUpdateCategoryWithoutData()
    {
        $this->actingAs($this->user);

        $category = Category::factory()->create([
            'user_id' => $this->user->id
        ]);

        $response = $this->json('PATCH', 'api/categories/' . $category->id);

        $response->assertOk();
    }

    public function testTryUpdateCategoryWithEmptyName()
    {
        $this->actingAs($this->user);

        $category = Category::factory()->create([
            'user_id' => $this->user->id
        ]);

        $response = $this->json('PATCH', 'api/categories/' . $category->id, [
            'name' => '',
        ]);

        $response->assertUnprocessable();

        $response->assertJsonFragment([
            'name' => ['O campo name deve ser uma string.'],
        ]);
    }

    public function testTryUpdateWithNameTooLong()
    {
        $this->actingAs($this->user);

        $category = Category::factory()->create([
            'user_id' => $this->user->id
        ]);

        $response = $this->json('PATCH', 'api/categories/' . $category->id, [
            'name' => Str::random(Category::NAME_MAX_LENGTH + 1),
        ]);

        $response->assertUnprocessable();

        $response->assertJsonFragment([
            'name' => ['O campo name deve ter no máximo ' . Category::NAME_MAX_LENGTH .  ' caracteres.'],
        ]);
    }

    public function testTryUpdateWithNameNotString()
    {
        $this->actingAs($this->user);

        $category = Category::factory()->create([
            'user_id' => $this->user->id
        ]);

        $response = $this->json('PATCH', 'api/categories/' . $category->id, [
            'name' => 100,
        ]);

        $response->assertUnprocessable();

        $response->assertJsonFragment([
            'name' => ['O campo name deve ser uma string.'],
        ]);
    }

    public function testUpdateNameSuccessfully()
    {
        $this->actingAs($this->user);

        $category = Category::factory()->create([
            'user_id' => $this->user->id
        ]);

        $data = [
            'name' => 'New Category Name',
        ];

        $response = $this->json('PATCH', 'api/categories/' . $category->id, [
            'name' => $data['name'],
        ]);

        $response->assertOk();

        $response->assertJsonStructure([
            'id',
            'user_id',
            'name',
            'type',
        ]);

        $response->assertExactJson([
            'id' => $category->id,
            'user_id' => $category->user_id,
            'name' => $data['name'],
            'type' => $category->type,
        ]);

        $this->assertDatabaseHas(Category::class, [
            'id' => $category->id,
            'name' => $data['name'],
        ]);
    }
}
