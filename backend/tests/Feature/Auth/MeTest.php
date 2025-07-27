<?php

namespace Tests\Feature;

use Tests\TestCase;

use App\Models\User;

class MeTest extends TestCase
{
    public function testTryAccessMeRouteNotLoggedTest()
    {
        $response = $this->json('GET', 'api/me/');
        $response->assertUnauthorized();
    }

    public function testAccessRouteMeLoggedTest()
    {
        $user = User::factory()->create();

        $this->actingAs($user);

        $response = $this->json('GET', 'api/me/');

        $response->assertOk();

        $response->assertExactJson([
            'id' => $user->id,
            'name' => $user->name,
            'email' => $user->email,
            'created_at' => $user->created_at,
            'updated_at' => $user->updated_at,
        ]);
    }
}
