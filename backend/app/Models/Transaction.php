<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

use App\Traits\Filterable;

class Transaction extends Model
{
    use HasFactory;
    use Filterable;

    /**
     * The maximum length of the name field.
     * 
     * @var int
     */
    const NAME_MAX_LENGTH = 70;

    /**
     * The maximum length of the description field.
     * 
     * @var int
     */
    const DESCRIPTION_MAX_LENGTH = 200;

    /**
     * The minimum value of the value field.
     * 
     * @var int
     */
    const VALUE_MIN = 0;

    /**
     * The maximum value of the value field.
     * 
     * @var int
     */
    const VALUE_MAX = 99999;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'category_id',
        'name',
        'value',
        'description',
        'date',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'id' => 'integer',
        'category_id' => 'integer',
        'name' => 'string',
        'value' => 'float',
        'description' => 'string',
        'date' => 'date',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    // =========================================================================
    // Relationships
    // =========================================================================

    public function category()
    {
        return $this->belongsTo(Category::class);
    }
}
