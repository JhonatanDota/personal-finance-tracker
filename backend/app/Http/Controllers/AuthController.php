<?php

namespace App\Http\Controllers;

use Illuminate\Http\Response;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Password;

use App\Repositories\UserRepository;

use App\Http\Requests\Auth\AuthRequest;
use App\Http\Requests\Auth\RegisterRequest;
use App\Http\Requests\Auth\ForgetPasswordRequest;

use Tymon\JWTAuth\Facades\JWTAuth;

use App\Http\Resources\User\UserResource;

class AuthController extends Controller
{
    private UserRepository $userRepository;

    public function __construct(UserRepository $userRepository)
    {
        $this->userRepository = $userRepository;
    }

    /**
     * Get a JWT via given credentials.
     *
     * @param AuthRequest $request
     * @return \Illuminate\Http\JsonResponse
     */

    public function login(AuthRequest $request): JsonResponse
    {
        $token = JWTAuth::attempt($request->validated());

        if (!$token) return response()->json(status: Response::HTTP_UNAUTHORIZED);

        return  response()->json([
            'token' => $token
        ]);
    }

    /**
     * Register user.
     *
     * @param RegisterRequest $request
     * @return \Illuminate\Http\JsonResponse
     */

    public function register(RegisterRequest $request): JsonResponse
    {
        $inputs = $request->validated();

        $user = $this->userRepository->create($inputs);

        return response()->json(new UserResource($user), Response::HTTP_CREATED);
    }

    /**
     * Retrieve current logged user data.
     *
     * @return JsonResponse
     */

    public function me(): JsonResponse
    {
        $user = Auth::user();

        return response()->json(new UserResource($user));
    }

    /**
     * Invalidate token.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout(): JsonResponse
    {
        Auth::logout();

        return response()->json();
    }

    /**
     * Send reset link email.
     * 
     * @param ForgetPasswordRequest $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function sendResetLinkEmail(ForgetPasswordRequest $request)
    {
        Password::sendResetLink(
            $request->only('email')
        );

        return response()->json();
    }
}
