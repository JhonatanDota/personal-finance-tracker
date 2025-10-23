<?php

namespace Tests\Feature\Auth;

use Tests\TestCase;

use App\Models\User;
use Illuminate\Support\Facades\Hash;

class LogoutTest extends TestCase
{
    public function testTryLogoutNotLogged()
    {
        $response = $this->json('POST', 'api/logout/');
        $response->assertUnauthorized();
    }

    public function testLogoutSuccessfully()
    {
        $email = 'test@email.com';
        $password = '54321';

        User::factory()->create([
            'email' => $email,
            'password' => Hash::make($password)
        ]);

        $login = $this->json(
            'POST',
            'api/auth/',
            [
                'email' => $email,
                'password' => $password
            ]
        );

        $login->assertOk();

        $token = $login['token'];

        // Access route logged

        $this->json('GET', 'api/me/', [], $this->authorization($token))->assertOk();

        // Logout

        $this->json('POST', 'api/logout/', [], $this->authorization($token))->assertOk();

        // Try access me route after logout

        $this->json('GET', 'api/me/', [], $this->authorization($token))->assertUnauthorized();
    }
}
