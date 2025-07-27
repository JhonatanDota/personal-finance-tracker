<?php

namespace Tests;

use Illuminate\Foundation\Testing\TestCase as BaseTestCase;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Illuminate\Contracts\Auth\Authenticatable;

use Faker\Factory as Faker;
use Faker\Generator;

use Tymon\JWTAuth\Facades\JWTAuth;

abstract class TestCase extends BaseTestCase
{
    use CreatesApplication;
    use DatabaseTransactions;

    protected Generator $faker;

    protected function setUp(): void
    {
        parent::setUp();

        $this->faker = Faker::create();
    }

    /**
     * Retrieve Bearer authorization.
     *
     * @param string $token
     * @return array
     */

    protected function authorization(string $token): array
    {
        return [
            'Authorization' => "Bearer $token"
        ];
    }

    /**
     * Set the currently logged user for the application.
     *
     * @param  \Illuminate\Contracts\Auth\Authenticatable $user
     * @param  string|null $guard
     * @return $this
     */

    public function actingAs(Authenticatable $user, $guard = null): self
    {
        $token = JWTAuth::fromUser($user);
        $this->withHeader('Authorization', "Bearer {$token}");
        parent::actingAs($user);

        return $this;
    }
}
