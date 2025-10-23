<?php

namespace Tests\Feature\Auth;

use Tests\TestCase;

use Illuminate\Support\Facades\Queue;
use Illuminate\Support\Facades\Notification;
use Illuminate\Notifications\SendQueuedNotifications;

use App\Notifications\ResetPasswordNotification;

use App\Models\User;

class ForgotPasswordTest extends TestCase
{
    public function testTrySendResetLinkWithoutEmail()
    {
        $response = $this->json('POST', 'api/password/forgot');

        $response->assertUnprocessable();
        $response->assertJsonValidationErrors([
            'email' => ['O campo email é obrigatório.'],
        ]);
    }

    public function testTrySendResetLinkWithInvalidEmail()
    {
        $response = $this->json('POST', 'api/password/forgot', [
            'email' => 'invalid_email',
        ]);

        $response->assertUnprocessable();
        $response->assertJsonValidationErrors([
            'email' => ['O email informado é inválido.'],
        ]);
    }

    public function testTrySendResetLinkToNonexistentUser()
    {
        Notification::fake();

        $response = $this->json('POST', 'api/password/forgot', [
            'email' => $this->faker->email(),
        ]);

        $response->assertOk();

        Notification::assertNothingSent();
    }

    public function testSendResetLinkIsQueued()
    {
        Queue::fake();

        $user = User::factory()->create();

        $this->json('POST', 'api/password/forgot', [
            'email' => $user->email
        ])->assertOk();

        Queue::assertPushed(SendQueuedNotifications::class);
    }

    public function testSendResetLinkSuccessfully()
    {
        Notification::fake();

        $user = User::factory()->create();

        $response = $this->json('POST', 'api/password/forgot', [
            'email' => $user->email,
        ]);

        $response->assertOk();

        Notification::assertSentTo(
            $user,
            ResetPasswordNotification::class,
            function ($notification) use ($user) {
                $mail = $notification->toMail($user);

                $this->assertStringContainsString('Redefinição de Senha', $mail->subject);
                $this->assertEquals('emails.reset-password', $mail->view);
                $this->assertArrayHasKey('user', $mail->viewData);
                $this->assertArrayHasKey('url', $mail->viewData);
                $this->assertEquals($user->email, $mail->viewData['user']->email);
                $this->assertStringContainsString('reset-password', $mail->viewData['url']);

                return true;
            }
        );
    }

    public function testSendResetLinkThrottleError()
    {
        $user = User::factory()->create();

        // The first request must return ok and sent notification normally

        $response = $this->json('POST', 'api/password/forgot', [
            'email' => $user->email,
        ]);

        $response->assertOk();

        // Anothers requests send to quick should return throttle error

        $response = $this->json('POST', 'api/password/forgot', [
            'email' => $user->email,
        ]);

        $response->assertTooManyRequests();
        $response->assertJsonValidationErrors(['throttle' => 'Limite de tentativas excedido, tente novamente em alguns minutos.']);
    }
}
