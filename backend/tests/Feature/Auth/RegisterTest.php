<?php

namespace Tests\Feature\Auth;

use Tests\TestCase;

use Illuminate\Support\Str;

use App\Models\User;

use App\Http\Resources\User\UserResource;

use App\Rules\Fields\User\NameRules;
use App\Rules\Fields\User\PasswordRules;
use App\Rules\Fields\Commom\EmailRules;

class RegisterTest extends TestCase
{
    public function testTryRegisterWithoutName()
    {
        $password = $this->faker->password();

        $response = $this->json('POST', 'api/register/', [
            'email' => $this->faker->email(),
            'password' => $password,
            'password_confirmation' => $password,
        ]);

        $response->assertUnprocessable();

        $response->assertJsonValidationErrors([
            'name' => ['The name field is required.'],
        ]);
    }

    public function testTryRegisterWithTooTinyName()
    {
        $password = $this->faker->password();

        $response = $this->json('POST', 'api/register/', [
            'name' => Str::random(NameRules::MIN_LENGTH - 1),
            'email' => $this->faker->email(),
            'password' => $password,
            'password_confirmation' => $password,
        ]);

        $response->assertUnprocessable();

        $response->assertJsonValidationErrors([
            'name' => ['The name field must be at least ' . NameRules::MIN_LENGTH . ' characters.'],
        ]);
    }

    public function testTryRegisterWithTooLongName()
    {
        $password = $this->faker->password();

        $response = $this->json('POST', 'api/register/', [
            'name' => Str::random(NameRules::MAX_LENGTH + 1),
            'email' => $this->faker->email(),
            'password' => $password,
            'password_confirmation' => $password,
        ]);

        $response->assertUnprocessable();

        $response->assertJsonValidationErrors([
            'name' => ['The name field must not be greater than ' . NameRules::MAX_LENGTH . ' characters.'],
        ]);
    }

    public function testTryRegisterWithoutEmail()
    {
        $password = $this->faker->password();

        $response = $this->json('POST', 'api/register/', [
            'name' => $this->faker->name(),
            'password' => $password,
            'password_confirmation' => $password,
        ]);

        $response->assertUnprocessable();

        $response->assertJsonValidationErrors([
            'email' => ['The email field is required.'],
        ]);
    }

    public function testTryRegisterWithInvalidEmail()
    {
        $password = $this->faker->password();

        $response = $this->json('POST', 'api/register/', [
            'name' => $this->faker->name(),
            'email' => 'invalid@mail',
            'password' => $password,
            'password_confirmation' => $password,
        ]);

        $response->assertUnprocessable();

        $response->assertJsonValidationErrors([
            'email' => ['The email field format is invalid.'],
        ]);
    }

    public function testTryRegisterWithEmailTooLong()
    {
        $password = $this->faker->password();

        $response = $this->json('POST', 'api/register/', [
            'name' => $this->faker->name(),
            'email' => Str::random(EmailRules::MAX_LENGTH + 1) . '@mail.com',
            'password' => $password,
            'password_confirmation' => $password,
        ]);

        $response->assertUnprocessable();

        $response->assertJsonValidationErrors([
            'email' => ['The email field must not be greater than ' . EmailRules::MAX_LENGTH . ' characters.'],
        ]);
    }

    public function testTryRegisterWithDuplicatedEmail()
    {
        $email = $this->faker->email();
        $password = $this->faker->password();

        User::factory([
            'email' => $email,
            'password' => $password,
        ])->create();

        $response = $this->json('POST', 'api/register/', [
            'name' => $this->faker->name(),
            'email' => $email,
            'password' => $password,
            'password_confirmation' => $password,
        ]);

        $response->assertUnprocessable();

        $response->assertJsonValidationErrors([
            'email' => ['The email has already been taken.'],
        ]);
    }

    public function testTryRegisterWithoutPassword()
    {
        $response = $this->json('POST', 'api/register/', [
            'name' => $this->faker->name(),
            'email' => $this->faker->email(),
        ]);

        $response->assertUnprocessable();

        $response->assertJsonValidationErrors([
            'password' => ['The password field is required.'],
        ]);
    }

    public function testTryRegisterWithoutPasswordConfirmation()
    {
        $response = $this->json('POST', 'api/register/', [
            'name' => $this->faker->name(),
            'email' => $this->faker->email(),
            'password' => $this->faker->password(),
        ]);

        $response->assertUnprocessable();

        $response->assertJsonValidationErrors([
            'password' => ['The password field confirmation does not match.'],
        ]);
    }

    public function testTryRegisterWithTooTinyPassword()
    {
        $password = Str::random(PasswordRules::MIN_LENGTH - 1);

        $response = $this->json('POST', 'api/register/', [
            'name' => $this->faker->name(),
            'email' => $this->faker->email(),
            'password' => $password,
            'password_confirmation' => $password,
        ]);

        $response->assertUnprocessable();

        $response->assertJsonValidationErrors([
            'password' => ['The password field must be at least ' . PasswordRules::MIN_LENGTH . ' characters.'],
        ]);
    }

    public function testTryRegisterWithTooLongPassword()
    {
        $password = Str::random(PasswordRules::MAX_LENGTH + 1);

        $response = $this->json('POST', 'api/register/', [
            'name' => $this->faker->name(),
            'email' => $this->faker->email(),
            'password' => $password,
            'password_confirmation' => $password,
        ]);

        $response->assertUnprocessable();

        $response->assertJsonValidationErrors([
            'password' => ['The password field must not be greater than ' . PasswordRules::MAX_LENGTH . ' characters.'],
        ]);
    }

    public function testTryRegisterSuccessfully()
    {
        $password = $this->faker->password();

        $userData = [
            'name' => $this->faker->name(),
            'email' => $this->faker->email(),
            'password' => $password,
            'password_confirmation' => $password,
        ];

        $response = $this->json('POST', 'api/register/', $userData);
        $responseData = $response->json();

        $response->assertCreated();

        $response->assertExactJson(UserResource::make(User::find($responseData['id']))->resolve());

        $this->assertArrayNotHasKey('password', $responseData);
        $this->assertArrayNotHasKey('password_confirmation', $responseData);

        $this->assertDatabaseHas(User::class, [
            'email' => $userData['email'],
        ]);
    }
}
