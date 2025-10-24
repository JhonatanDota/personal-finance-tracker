<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Notification;
use Illuminate\Notifications\Messages\MailMessage;

/**
 * Class ResetPasswordNotification
 *
 * This notification is sent to users who request a password reset.
 * It contains a unique token that allows them to securely reset their password.
 * 
 * The notification is queued to avoid blocking the HTTP request cycle.
 */
class ResetPasswordNotification extends Notification implements ShouldQueue
{
    use Queueable;

    /**
     * The raw password reset token.
     *
     * @var string
     */
    private string $token;

    /**
     * Create a new notification instance.
     *
     * @param  string  $token
     * @return void
     */
    public function __construct(string $token)
    {
        $this->token = $token;
    }

    /**
     * Get the notification delivery channels.
     *
     * @param  mixed  $notifiable
     * @return array<int, string>
     */
    public function via(mixed $notifiable): array
    {
        return ['mail'];
    }

    /**
     * Build the mail representation of the notification.
     *
     * @param  mixed  $notifiable  The entity that will receive the email (typically a User model).
     * @return \Illuminate\Notifications\Messages\MailMessage
     */
    public function toMail(mixed $notifiable): MailMessage
    {
        $queryParams = http_build_query([
            'token' => $this->token,
            'email' => $notifiable->email
        ]);

        $url = env('FRONTEND_URL') . 'reset-password?' . $queryParams;

        return (new MailMessage)
            ->subject('Redefinição de Senha')
            ->view('emails.reset-password', [
                'url' => $url,
                'user' => $notifiable,
            ]);
    }

    /**
     * Get the array representation of the notification (optional).
     *
     * @param  mixed  $notifiable
     * @return array<string, mixed>
     */
    public function toArray(mixed $notifiable): array
    {
        return [
            'email' => $notifiable->email,
            'token' => $this->token,
        ];
    }
}
