<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;

use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasManyThrough;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

use Tymon\JWTAuth\Contracts\JWTSubject;

use App\Notifications\ResetPasswordNotification;

use App\Enums\CategoryTypesEnum;

class User extends Authenticatable implements JWTSubject
{
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
        'email_verified_at',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];

    /**
     * Get the identifier that will be stored in the subject claim of the JWT.
     *
     * @return mixed
     */
    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    /**
     * Return a key value array, containing any custom claims to be added to the JWT.
     *
     * @return array
     */
    public function getJWTCustomClaims()
    {
        return [
            'user' => [
                'id' => $this->id,
                'name' => $this->name,
            ]
        ];
    }

    /**
     * Send the password reset notification to the user.
     *
     * This method is automatically called by Laravel's Password Broker
     * when a password reset token is created via Password::sendResetLink().
     *
     * @param  string  $token 
     * @return void
     */
    public function sendPasswordResetNotification($token): void
    {
        $this->notify(new ResetPasswordNotification($token));
    }

    // =========================================================================
    // Relationships
    // =========================================================================

    public function categories(): HasMany
    {
        return $this->hasMany(Category::class);
    }

    public function transactions(): HasManyThrough
    {
        return $this->HasManyThrough(Transaction::class, Category::class);
    }

    public function incomeTransactions(): HasManyThrough
    {
        return $this->transactions()->where('type', CategoryTypesEnum::INCOME);
    }

    public function expenseTransactions(): HasManyThrough
    {
        return $this->transactions()->where('type', CategoryTypesEnum::EXPENSE);
    }
}
