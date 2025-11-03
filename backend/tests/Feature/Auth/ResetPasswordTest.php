<?php

namespace Tests\Feature\Auth;

use Tests\TestCase;

use Illuminate\Support\Facades\Password;
use Illuminate\Support\Facades\Hash;

use App\Rules\Fields\User\PasswordRules;

use App\Models\User;

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

    // =========================================================================
    // RESET PASSWORD
    // =========================================================================

    public function testTryResetPasswordWithInvalidUser()
    {
        $password = $this->faker->password();
        $token = Password::createToken(User::factory()->create());

        $response = $this->json('POST', 'api/password/reset', [
            'token' => $token,
            'email' => $this->faker->email(),
            'password' => $password,
            'password_confirmation' => $password,
        ]);

        $response->assertUnprocessable();
        $response->assertJson([
            'errors' => [
                'reset' => ['Usuário não encontrado.'],
            ],
        ]);
    }

    public function testTryResetPasswordWithInvalidToken()
    {
        $user = User::factory()->create();
        $password = $this->faker->password();

        $response = $this->json('POST', 'api/password/reset', [
            'token' => $this->faker->uuid(),
            'email' => $user->email,
            'password' => $password,
            'password_confirmation' => $password,
        ]);

        $response->assertUnprocessable();
        $response->assertJson([
            'errors' => [
                'reset' => ['Token de redefinição inválido ou expirado.'],
            ],
        ]);
    }

    public function testTryReuseToken()
    {
        $user = User::factory()->create();
        $token = Password::createToken($user);
        $password = $this->faker->password();

        $this->json('POST', 'api/password/reset', [
            'token' => $token,
            'email' => $user->email,
            'password' => $password,
            'password_confirmation' => $password,
        ])->assertOk();

        $response = $this->json('POST', 'api/password/reset', [
            'token' => $token,
            'email' => $user->email,
            'password' => 'another-password',
            'password_confirmation' => 'another-password',
        ]);

        $response->assertUnprocessable();
        $response->assertJson([
            'errors' => [
                'reset' => ['Token de redefinição inválido ou expirado.'],
            ],
        ]);
    }

    public function testResetPasswordSuccessfully()
    {
        $user = User::factory()->create();
        $token = Password::createToken($user);

        $password = $this->faker->password();

        $response = $this->json('POST', 'api/password/reset', [
            'token' => $token,
            'email' => $user->email,
            'password' => $password,
            'password_confirmation' => $password,
        ]);

        $response->assertOk();

        $user->refresh();

        $this->assertTrue(Hash::check($password, $user->password));

        // Assert user can login with new password

        $this->json('POST', 'api/auth/', [
            'email' => $user->email,
            'password' => $password,
        ])->assertOk();
    }
}
