<?php

namespace Tests\Feature\Auth;

use Tests\TestCase;

use App\Models\User;

use App\Http\Resources\User\UserResource;

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

        $response->assertExactJson(UserResource::make($user)->resolve());

        $this->assertArrayNotHasKey('password', $response->json());
        $this->assertArrayNotHasKey('password_confirmation', $response->json());
    }
}
