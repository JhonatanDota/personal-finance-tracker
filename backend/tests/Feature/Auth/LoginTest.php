<?php

namespace Tests\Feature;

use Tests\TestCase;

use App\Models\User;
use Illuminate\Support\Facades\Hash;

class LoginTest extends TestCase
{
    public function testTryLoginWithoutCredentials()
    {
        $response = $this->json('POST', 'api/auth/');

        $response->assertUnprocessable();
        $response->assertJsonValidationErrors(['email', 'password']);
        $response->assertJsonValidationErrors([
            'email' => ['The email field is required.'],
            'password' => ['The password field is required.'],
        ]);
    }

    public function testTryLoginWithoutEmail()
    {
        $response = $this->json('POST', 'api/auth/', ['password' => '12345']);

        $response->assertUnprocessable();
        $response->assertJsonValidationErrors(['email']);
        $response->assertJsonValidationErrors(['email' => ['The email field is required.']]);
    }

    public function testTryLoginWithInvalidEmail()
    {
        $response = $this->json(
            'POST',
            'api/auth/',
            ['email' => 'invalid_email', 'password' => '12345']
        );

        $response->assertUnprocessable();
        $response->assertJsonValidationErrors(['email']);
        $response->assertJsonValidationErrors(['email' => ['The email field must be a valid email address.']]);
    }

    public function testTryLoginWithoutPassword()
    {
        $response = $this->json('POST', 'api/auth/', ['email' => 'test@email.com']);

        $response->assertUnprocessable();
        $response->assertJsonValidationErrors(['password']);
        $response->assertJsonValidationErrors(['password' => ['The password field is required.']]);
    }

    public function testTryLoginWithInvalidCredentials()
    {
        $response = $this->json(
            'POST',
            'api/auth/',
            [
                'email' => 'test@email.com',
                'password' => '12345'
            ]
        );

        $response->assertUnauthorized();
    }

    public function testLoginSuccessfully()
    {
        $email = 'test@email.com';
        $password = '54321';

        User::factory()->create([
            'email' => $email,
            'password' => Hash::make($password)
        ]);

        $response = $this->json(
            'POST',
            'api/auth/',
            [
                'email' => $email,
                'password' => $password
            ]
        );

        $response->assertOk();
        $response->assertJsonStructure(['token']);
    }
}
