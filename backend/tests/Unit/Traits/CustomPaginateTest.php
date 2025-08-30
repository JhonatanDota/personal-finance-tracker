<?php

namespace Tests\Unit\Traits;

use Tests\TestCase;
use App\Traits\CustomPaginate;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Collection;
use Illuminate\Http\Resources\Json\JsonResource;

class CustomPaginateTest extends TestCase
{
    use CustomPaginate;

    protected function getDummyResourceClass(): string
    {
        $dummyResource = new class([]) extends JsonResource {
            public function toArray($request)
            {
                return ['id' => $this->id ?? null];
            }
        };

        return get_class($dummyResource);
    }

    public function testReturnSimplePaginateWithDefaultPerPage()
    {
        $items = Collection::times(5, fn($i) => (object)['id' => $i + 1]);
        $paginator = new LengthAwarePaginator($items, 5, 10, 1);

        $result = $this->toSimplePaginate($paginator);

        $this->assertEquals(10, $result['meta']['per_page']);
        $this->assertCount(5, $result['data']);
        $this->assertEquals(1, $result['meta']['current_page']);
        $this->assertEquals(1, $result['meta']['last_page']);
        $this->assertEquals(5, $result['meta']['total']);
    }

    public function testReturnSimplePaginateWithResource()
    {
        $items = Collection::times(5, fn($i) => (object)['id' => $i + 1]);
        $paginator = new LengthAwarePaginator($items, 5, 10, 1);

        $resourceClass = $this->getDummyResourceClass();

        $result = $this->toSimplePaginateWithResource($paginator, $resourceClass);

        $this->assertCount(5, $result['data']);
        $this->assertEquals(10, $result['meta']['per_page']);
        $this->assertEquals(1, $result['meta']['current_page']);
        $this->assertEquals(1, $result['meta']['last_page']);
        $this->assertEquals(5, $result['meta']['total']);
    }

    public function testReturnSimplePaginateEmptyPaginator()
    {
        $items = collect([]);
        $paginator = new LengthAwarePaginator($items, 0, 10, 1);

        $result = $this->toSimplePaginate($paginator);

        $this->assertEmpty($result['data']);
        $this->assertEquals(0, $result['meta']['total']);
        $this->assertEquals(1, $result['meta']['current_page']);
        $this->assertEquals(1, $result['meta']['last_page']);
        $this->assertEquals(10, $result['meta']['per_page']);
    }

    public function testReturnSimplePaginateMultiplePages()
    {
        $items = Collection::times(50, fn($i) => (object)['id' => $i + 1]);
        $paginator = new LengthAwarePaginator($items->slice(0, 10), 50, 10, 1);

        $result = $this->toSimplePaginate($paginator);

        $this->assertEquals(1, $result['meta']['current_page']);
        $this->assertEquals(5, $result['meta']['last_page']);
        $this->assertCount(10, $result['data']);
        $this->assertEquals(50, $result['meta']['total']);
    }

    public function testApplyPerPageLimitReturnsDefaultWhenNullPassed()
    {
        $result = $this->applyPerPageLimit(null);
        $this->assertEquals(self::DEFAULT_PER_PAGE, $result);
    }

    public function testApplyPerPageLimitReturnsRequestedValueWithinLimit()
    {
        $result = $this->applyPerPageLimit(50);
        $this->assertEquals(50, $result);
    }

    public function testApplyPerPageLimitCapsValueAtMax()
    {
        $result = $this->applyPerPageLimit(200);
        $this->assertEquals(self::MAX_PER_PAGE, $result);
    }
}
