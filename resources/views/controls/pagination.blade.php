@if ($paginator->hasPages())
    <nav class="pagination" role="navigation" aria-label="pagination">

        {{--$paginator->total()--}}

        {{-- Previous Page Link --}}
        @if ($paginator->onFirstPage())
            <a disabled class="pagination-previous">@lang('pagination.previous')</a>
        @else
            <a href="{{ $paginator->previousPageUrl() }}" class="pagination-previous">@lang('pagination.previous')</a>
        @endif


        {{-- Next Page Link --}}
        @if ($paginator->hasMorePages())
            <a href="{{ $paginator->nextPageUrl() }}" class="pagination-next">@lang('pagination.next')</a>
        @else
            <a disabled class="pagination-next">@lang('pagination.next')</a>
        @endif

        <ul class="pagination-list">
            {{-- Pagination Elements --}}
            @foreach ($elements as $element)
                {{-- "Three Dots" Separator --}}
                @if (is_string($element))
                    <li>
                      <span class="pagination-ellipsis">&hellip;</span>
                    </li>
                @endif

                {{-- Array Of Links --}}
                @if (is_array($element))
                    @foreach ($element as $page => $url)
                        @if ($page == $paginator->currentPage())
                            <li>
                              <a class="pagination-link is-current">{{ $page }}</a>
                            </li>
                        @else
                            <li>
                              <a href="{{ $url }}" class="pagination-link">{{ $page }}</a>
                            </li>
                        @endif
                    @endforeach
                @endif
            @endforeach
        </ul>
    </nav>
@endif
