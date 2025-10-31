<?php

namespace Tests\Feature\Auth;

use Tests\TestCase;
use App\Rules\Fields\User\PasswordRules;
use App\Rules\Fields\Commom\EmailRules;

class ResetPasswordTest extends TestCase
{
    // =========================================================================
    // EMAIL
    // =========================================================================

    public function testTryResetWithInvalidEmailFormat()
    {
        $password = $this->faker->password();

        $response = $this->json('POST', 'api/password/reset', [
            'token' => $this->faker->uuid(),
            'email' => 'invalid_email',
            'password' => $password,
            'password_confirmation' => $password,
        ]);

        $response->assertUnprocessable();
        $response->assertJsonValidationErrors([
            'email' => ['O email informado é inválido.'],
        ]);
    }

    public function testTryResetWithoutEmailTLD()
    {
        $password = $this->faker->password();

        $response = $this->json('POST', 'api/password/reset', [
            'token' => $this->faker->uuid(),
            'email' => 'invalid_email@local',
            'password' => $password,
            'password_confirmation' => $password,
        ]);

        $response->assertUnprocessable();
        $response->assertJsonValidationErrors([
            'email' => ['O email informado é inválido.'],
        ]);
    }

    // =========================================================================
    // TOKEN
    // =========================================================================

    public function testTryResetWithoutData()
    {
        $response = $this->json('POST', 'api/password/reset', []);

        $response->assertUnprocessable();
        $response->assertJsonValidationErrors([
            'token' => ['O campo token é obrigatório.'],
            'email' => ['O campo email é obrigatório.'],
            'password' => ['O campo password é obrigatório.'],
        ]);
    }

    public function testTryResetWithInvalidTokenFormat()
    {
        $password = $this->faker->password();

        $response = $this->json('POST', 'api/password/reset', [
            'token' => 999,
            'email' => $this->faker->email(),
            'password' => $password,
            'password_confirmation' => $password,
        ]);

        $response->assertUnprocessable();
        $response->assertJsonValidationErrors([
            'token' => ['O token informado é inválido.'],
        ]);
    }

    // =========================================================================
    // PASSWORD
    // =========================================================================

    public function testTryResetWithShortPassword()
    {
        $password = $this->faker->password(minLength: 1, maxLength: PasswordRules::MIN_LENGTH - 1);

        $response = $this->json('POST', 'api/password/reset', [
            'token' => $this->faker->uuid(),
            'email' => $this->faker->email(),
            'password' => $password,
            'password_confirmation' => $password,
        ]);

        $response->assertUnprocessable();
        $response->assertJsonValidationErrors([
            'password' => ['O campo password deve ter no mínimo ' . PasswordRules::MIN_LENGTH . ' caracteres.'],
        ]);
    }

    public function testTryResetWithTooLongPassword()
    {
        $password = $this->faker->password(minLength: PasswordRules::MAX_LENGTH + 1, maxLength: PasswordRules::MAX_LENGTH + 1);

        $response = $this->json('POST', 'api/password/reset', [
            'token' => $this->faker->uuid(),
            'email' => $this->faker->email(),
            'password' => $password,
            'password_confirmation' => $password,
        ]);

        $response->assertUnprocessable();
        $response->assertJsonValidationErrors([
            'password' => ['O campo password deve ter no máximo ' . PasswordRules::MAX_LENGTH . ' caracteres.'],
        ]);
    }

    public function testTryResetWithPasswordConfirmationMismatch()
    {
        $response = $this->json('POST', 'api/password/reset', [
            'token' => $this->faker->uuid(),
            'email' => $this->faker->email(),
            'password' => $this->faker->password(),
            'password_confirmation' => $this->faker->password(),
        ]);

        $response->assertUnprocessable();
        $response->assertJsonValidationErrors([
            'password' => ['Os campos password e password_confirmation devem ser iguais.'],
        ]);
    }
}
