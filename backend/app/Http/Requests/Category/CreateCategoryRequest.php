<?php

namespace App\Http\Requests\Category;

use Illuminate\Foundation\Http\FormRequest;

use Illuminate\Validation\Rule;

use App\Models\User;
use App\Models\Category;

use App\Enums\CategoriesEnum;

class CreateCategoryRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'user_id' => ['required', Rule::exists(User::class, 'id')],
            'name' => ['required', 'string', 'max:' . Category::NAME_MAX_LENGTH],
            'type' => ['required', 'string', Rule::in(CategoriesEnum::values())],
        ];
    }

    /**
     * Prepare the data for validation.
     *
     * @return void
     */
    public function prepareForValidation()
    {
        $this->merge([
            'user_id' => auth()->id(),
        ]);
    }

    /**
     * Get the error messages for the defined validation rules.
     *
     * @return array
     */

    public function messages()
    {
        return [
            'user_id.required' => 'O campo user_id é obrigatório.',

            'name.required' => 'O campo name é obrigatório.',
            'name.string' => 'O campo name deve ser uma string.',
            'name.max' => 'O campo name deve ter no máximo ' . Category::NAME_MAX_LENGTH .  ' caracteres.',

            'type.required' => 'O campo type é obrigatório.',
            'type.in' => 'O campo type deve conter um valor válido',
        ];
    }
}
