<?php

namespace App\Http\Requests\Category;

use Illuminate\Foundation\Http\FormRequest;

use Illuminate\Validation\Rule;

use App\Enums\CategoriesEnum;

use App\Models\Category;

class UpdateCategoryRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return $this->user()->can('update', $this->route('category'));
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'name' => ['sometimes', 'string', 'max:' . Category::NAME_MAX_LENGTH],
            'type' => ['sometimes', 'string', Rule::in(CategoriesEnum::values())],
        ];
    }

    /**
     * Get the error messages for the defined validation rules.
     *
     * @return array
     */

    public function messages()
    {
        return [
            'name.string' => 'O campo name deve ser uma string.',
            'name.max' => 'O campo name deve ter no máximo ' . Category::NAME_MAX_LENGTH .  ' caracteres.',

            'type.string' => 'O campo type deve ser uma string.',
            'type.in' => 'O campo type deve conter um valor válido.',
        ];
    }
}
