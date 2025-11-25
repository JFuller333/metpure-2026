// define templates for the Minimog - OS 2.0-FoxEcom-5.0.1 theme 
var _usfImageWidths;
var _usfPrice = `
<template v-if="!priceLoader">
    <div class="m-price m:inline-flex m:items-center m:flex-wrap" :class="{'m-price--sold-out': isSoldOut,'m-price--on-sale': hasDiscount}" data-sale-badge-type="percentage" v-html="priceHtml">
        <div class="m-price__regular">
            <span class="m:visually-hidden m:visually-hidden--inline">regular price</span>
            <span class="m-price-item m-price-item--regular " v-html="displayDiscountedPrice"></span>
        </div>
        <div class="m-price__sale">
            <span class="m:visually-hidden m:visually-hidden--inline">sale price</span>
            <span class="m-price-item m-price-item--sale m-price-item--last" v-html="displayDiscountedPrice"></span>
            <span class="m:visually-hidden m:visually-hidden--inline">regular price</span>
            <s class="m-price-item m-price-item--regular" v-html="displayPrice"></s>
        </div>
    </div>
</template>
<div v-else class="m-price m:inline-flex m:items-center m:flex-wrap" :class="{'m-price--sold-out': isSoldOut,'m-price--on-sale': hasDiscount}" data-sale-badge-type="percentage">
    <div class="m-price__regular">
        <span class="m:visually-hidden m:visually-hidden--inline">regular price</span>
        <span class="m-price-item m-price-item--regular " v-html="displayDiscountedPrice"></span>
    </div>
    <div class="m-price__sale">
        <span class="m:visually-hidden m:visually-hidden--inline">sale price</span>
        <span class="m-price-item m-price-item--sale m-price-item--last" v-html="displayDiscountedPrice"></span>
        <span class="m:visually-hidden m:visually-hidden--inline">regular price</span>
        <s class="m-price-item m-price-item--regular" v-html="displayPrice"></s>
    </div>
</div>

`;

var _usfFilterBodyTemplate = /*inc_begin_filter-body*/
`<!-- Range filter -->
<div v-if="isRange" class="usf-facet-values usf-facet-range">
    <!-- Range inputs -->
    <div class="usf-slider-inputs usf-clear">
        <span class="usf-slider-input__from">
            <span class="usf-slider-input__prefix" v-html="facet.sliderPrefix" v-if="facet.showSliderInputPrefixSuffix"></span>
            <input :readonly="!hasRangeInputs" :value="rangeConverter(range[0]).toFixed(rangeDecimals)" @change="e => onRangeInput(e, range[0], 0)">
            <span class="usf-slider-input__suffix" v-html="facet.sliderSuffix" v-if="facet.showSliderInputPrefixSuffix"></span>
        </span>
        <span class="usf-slider-div">-</span>
        <span class="usf-slider-input__to">
            <span class="usf-slider-input__prefix" v-html="facet.sliderPrefix" v-if="facet.showSliderInputPrefixSuffix"></span>
            <input :readonly="!hasRangeInputs" :value="rangeConverter(range[1]).toFixed(rangeDecimals)" @change="e => onRangeInput(e, range[1], 1)">
            <span class="usf-slider-input__suffix" v-html="facet.sliderSuffix" v-if="facet.showSliderInputPrefixSuffix"></span>
        </span>
    </div>
	<!-- See API reference of this component at https://docs.sobooster.com/search/storefront-js-api/slider-component -->
    <usf-slider :color="facet.sliderColor" :symbols="facet.sliderValueSymbols" :prefix="facet.sliderPrefix" :suffix="facet.sliderSuffix" :min="facet.min" :max="facet.max" :pips="facet.range[0]" :step="facet.range[1]" :decimals="rangeDecimals" :value="range" :converter="rangeConverter" @input="onRangeSliderInput" @change="onRangeSliderChange"></usf-slider>
</div>
<!-- List + Swatch filter -->
<div v-else ref="values" :class="'usf-facet-values usf-scrollbar usf-facet-values--' + facet.display + (facet.navigationCollections ? ' usf-navigation' : '') + (facet.valuesTransformation ? (' usf-' + facet.valuesTransformation.toLowerCase()) : '') + (facet.circleSwatch ? ' usf-facet-values--circle' : '')" :style="!usf.isMobileFilter && facet.maxHeight ? { maxHeight: facet.maxHeight } : null">
    <!-- Filter options -->                
    <usf-filter-option v-for="o in visibleOptions" :facet="facet" :option="o" :key="o.id ? o.id : o.label+'_'+o.min+'_'+o.max"></usf-filter-option>
</div>

<!-- More -->
<div v-if="isMoreVisible" class="usf-more" @click="onShowMore" v-html="loc.more"></div>`
/*inc_end_filter-body*/;

var _usfSearchResultsSkeletonItemTpl = /*inc_begin_search-skeleton-item*/
`<div v-if="view === 'grid'" class="usf-sr-product usf-skeleton">
    <div class="usf-img"></div>
    <div class="usf-meta"></div>
</div>
<div class="usf-sr-product usf-skeleton" v-else>
    <!-- Image column -->
    <div class="usf-img-column">
        <div class="usf-img"></div>
    </div>

    <!-- Info column -->
    <div class="usf-info-column">
        <div class="usf-title"></div>
        <div class="usf-vendor"></div>
        <div class="usf-price-wrapper"></div>
    </div>
</div>`
/*inc_end_search-skeleton-item*/;

var _usfSearchResultsSummaryTpl = /*inc_begin_search-summary*/
`<span class="usf-sr-summary" v-html="loader === true ? '&nbsp;' : usf.utils.format(term ? loc.productSearchResultWithTermSummary : loc.productSearchResultSummary, result.total, usf.utils.encodeHtml(term))"></span>`
/*inc_end_search-summary*/;

var _usfSearchResultsViewsTpl = 
`<div class="usf-views">
<div class="m-toolbar--column-switcher m:flex usf-switcher">
    <button class="m:flex m-tooltip m-tooltip--top" :class="{'active': layout == 1}" @click.prevent.stop="onNewGridViewClick(1)" data-column="1">
      <svg class="m-svg-icon--small" fill="currentColor"  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12.5 9.5"><defs></defs><defs><style>.cls-1{fill-rule:evenodd}</style></defs><g id="Layer_2" data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1"><g id="shop_page" data-name="shop page"><g id="Group-16"><path id="Rectangle" d="M12.5.75a.76.76 0 01-.75.75h-11A.76.76 0 010 .75.76.76 0 01.75 0h11a.76.76 0 01.75.75z" class="cls-1"></path><path id="Rectangle-2" d="M12.5 4.75a.76.76 0 01-.75.75h-11A.76.76 0 010 4.75.76.76 0 01.75 4h11a.76.76 0 01.75.75z" class="cls-1" data-name="Rectangle"></path><path id="Rectangle-3" d="M12.5 8.75a.76.76 0 01-.75.75h-11A.76.76 0 010 8.75.76.76 0 01.75 8h11a.76.76 0 01.75.75z" class="cls-1" data-name="Rectangle"></path></g></g></g></g></svg>
      <span class="m-tooltip__content">List</span>
    </button>
    <button class="m:flex m-tooltip m-tooltip--top" :class="{'active': layout == 2}" @click.prevent.stop="onNewGridViewClick(2)" data-column="2">
      <svg class="m-svg-icon--small" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 5.5 12.5"><defs></defs><defs><style>.cls-1{fill-rule:evenodd}</style></defs><g id="Layer_2" data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1"><g id="shop_page" data-name="shop page"><g id="Group-10"><path id="Rectangle" d="M.75 0a.76.76 0 01.75.75v11a.76.76 0 01-.75.75.76.76 0 01-.75-.75v-11A.76.76 0 01.75 0z" class="cls-1"></path><path id="Rectangle-2" d="M4.75 0a.76.76 0 01.75.75v11a.76.76 0 01-.75.75.76.76 0 01-.75-.75v-11A.76.76 0 014.75 0z" class="cls-1" data-name="Rectangle"></path></g></g></g></g></svg>
      <span class="m-tooltip__content">2 columns</span>
    </button>
    <button class="m:hidden md:m:flex m-tooltip m-tooltip--top" :class="{'active': layout == 3}"  @click.prevent.stop="onNewGridViewClick(3)" data-column="3">
      <svg class="m-svg-icon--small" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 9.5 12.5"><defs></defs><defs><style>.cls-1{fill-rule:evenodd}</style></defs><g id="Layer_2" data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1"><g id="shop_page" data-name="shop page"><g id="Group-16"><path id="Rectangle" d="M.75 0a.76.76 0 01.75.75v11a.76.76 0 01-.75.75.76.76 0 01-.75-.75v-11A.76.76 0 01.75 0z" class="cls-1"></path><path id="Rectangle-2" d="M4.75 0a.76.76 0 01.75.75v11a.76.76 0 01-.75.75.76.76 0 01-.75-.75v-11A.76.76 0 014.75 0z" class="cls-1" data-name="Rectangle"></path><path id="Rectangle-3" d="M8.75 0a.76.76 0 01.75.75v11a.76.76 0 01-.75.75.76.76 0 01-.75-.75v-11A.76.76 0 018.75 0z" class="cls-1" data-name="Rectangle"></path></g></g></g></g></svg>
      <span class="m-tooltip__content">3 columns</span>
    </button>
    <button class="m:hidden md:m:flex m-tooltip m-tooltip--top" :class="{'active': layout == 4}" @click.prevent.stop="onNewGridViewClick(4)" data-column="4">
      <svg class="m-svg-icon--small" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 13.5 12.5"><defs></defs><defs><style>.cls-1{fill-rule:evenodd}</style></defs><g id="Layer_2" data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1"><g id="shop_page" data-name="shop page"><g id="_4_col" data-name="4_col"><path id="Rectangle" d="M.75 0a.76.76 0 01.75.75v11a.76.76 0 01-.75.75.76.76 0 01-.75-.75v-11A.76.76 0 01.75 0z" class="cls-1"></path><path id="Rectangle-2" d="M4.75 0a.76.76 0 01.75.75v11a.76.76 0 01-.75.75.76.76 0 01-.75-.75v-11A.76.76 0 014.75 0z" class="cls-1" data-name="Rectangle"></path><path id="Rectangle-3" d="M8.75 0a.76.76 0 01.75.75v11a.76.76 0 01-.75.75.76.76 0 01-.75-.75v-11A.76.76 0 018.75 0z" class="cls-1" data-name="Rectangle"></path><path id="Rectangle-4" d="M12.75 0a.76.76 0 01.75.75v11a.76.76 0 01-.75.75.76.76 0 01-.75-.75v-11a.76.76 0 01.75-.75z" class="cls-1" data-name="Rectangle"></path></g></g></g></g></svg>
      <span class="m-tooltip__content">4 columns</span>
    </button>
    <button class="m:hidden lg:m:flex m-tooltip m-tooltip--top" :class="{'active': layout == 5}" @click.prevent.stop="onNewGridViewClick(5)" data-column="5">
      <svg class="m-svg-icon--small" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 17.5 12.5"><defs></defs><defs><style>.cls-1{fill-rule:evenodd}</style></defs><g id="Layer_2" data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1"><g id="shop_page" data-name="shop page"><g id="_5_col" data-name="5_col"><path id="Rectangle" d="M.75 0a.76.76 0 01.75.75v11a.76.76 0 01-.75.75.76.76 0 01-.75-.75v-11A.76.76 0 01.75 0z" class="cls-1"></path><path id="Rectangle-2" d="M4.75 0a.76.76 0 01.75.75v11a.76.76 0 01-.75.75.76.76 0 01-.75-.75v-11A.76.76 0 014.75 0z" class="cls-1" data-name="Rectangle"></path><path id="Rectangle-3" d="M8.75 0a.76.76 0 01.75.75v11a.76.76 0 01-.75.75.76.76 0 01-.75-.75v-11A.76.76 0 018.75 0z" class="cls-1" data-name="Rectangle"></path><path id="Rectangle-4" d="M12.75 0a.76.76 0 01.75.75v11a.76.76 0 01-.75.75.76.76 0 01-.75-.75v-11a.76.76 0 01.75-.75z" class="cls-1" data-name="Rectangle"></path><path id="Rectangle-5" d="M16.75 0a.76.76 0 01.75.75v11a.76.76 0 01-.75.75.76.76 0 01-.75-.75v-11a.76.76 0 01.75-.75z" class="cls-1" data-name="Rectangle"></path></g></g></g></g></svg>
      <span class="m-tooltip__content">5 columns</span>
    </button>
  </div>
</div>`
;

var _usfSearchResultsSortByTpl = /*inc_begin_search-sortby*/
`<usf-dropdown :placeholder="loc.sort" :value="sortBy" :options="sortByOptions" @input="onSortByChanged"></usf-dropdown>`
/*inc_end_search-sortby*/;

usf.templates = {
    // application
    app: 
`<div id="usf_container" class="usf-zone usf-clear" :class="{'usf-filters-horz': usf.settings.filters.horz}">
    <template v-if="hasFilters">
        <new-filters class="usf-sr-filters"></new-filters>
    </template>
    <usf-new-sr></usf-new-sr>
</div>`
,

    // search results
    searchResults: `
<div class="usf-sr-container" :class="{'usf-no-facets': noFacets, 'usf-empty': !loader && !hasResults, 'usf-nosearch': !showSearchBox}">
    <!-- Search form -->
    <form v-if="showSearchBox" action="/search" method="get" role="search" class="usf-sr-inputbox">
        <button type="submit" class="usf-icon usf-icon-search usf-btn"></button>
        <input name="q" autocomplete="off" ref="searchInput" v-model="termModel">
        <button v-if="termModel" class="usf-remove usf-btn" @click.prevent.stop="clearSearch"></button>
    </form>

    <div class="usf-sr-config" v-if="usf.isMobile">
        <div class="usf-sr-config__mobile-filters-wrapper">
            <div class="usf-filters" :class="{'usf-has-filters': !!facetFilters}" @click="onMobileToggle">
                <button class="usf-btn" v-html="loc.filters"></button>
            </div>
            ` + _usfSearchResultsSortByTpl + `
        </div>
        
        ` + _usfSearchResultsSummaryTpl + _usfSearchResultsViewsTpl + `
    </div>
    <div class="usf-sr-config" v-else>
        ` + _usfSearchResultsViewsTpl + _usfSearchResultsSummaryTpl + _usfSearchResultsSortByTpl + `
    </div>

    <usf-sr-banner v-if="result && result.extra && result.extra.banner && !result.extra.banner.isBottom" :banner="result.extra.banner"></usf-sr-banner>

    <!-- Load previous -->
    <div id="usf-sr-top-loader" :class="{'usf-with-loader':loader === 'prev'}" v-if="(loader === 'prev' || itemsOffset) && loader !== true && hasResults && usf.settings.search.more !== 'page'"></div>
    <div :class="(view === \'grid\' ? gridWrapClass  : \'list-view-items\') + \' usf-results usf-clear usf-\' + view">
        <template v-if="0 || loader===true">` + _usfSearchResultsSkeletonItemTpl + _usfSearchResultsSkeletonItemTpl + _usfSearchResultsSkeletonItemTpl + _usfSearchResultsSkeletonItemTpl +
        `</template>
        <template v-else>
            <template v-if="hasResults">
                <template v-if="view === 'grid'">
                    <template v-for="(p,index) in result.items">
                        <usf-sr-griditem1 v-if="_usfGlobalSettings.pcard_layout == 1" :product="p" :pIndex="index" :result="result" :key="p.id"></usf-sr-griditem1>
                        <usf-sr-griditem2 v-else-if="_usfGlobalSettings.pcard_layout == 2" :product="p" :pIndex="index" :result="result" :key="p.id"></usf-sr-griditem2>
                        <usf-sr-griditem3 v-else-if="_usfGlobalSettings.pcard_layout == 3" :product="p" :pIndex="index" :result="result" :key="p.id"></usf-sr-griditem3>
                        <usf-sr-griditem4 v-else-if="_usfGlobalSettings.pcard_layout == 4" :product="p" :pIndex="index" :result="result" :key="p.id"></usf-sr-griditem4>
                        <usf-sr-griditem5 v-else-if="_usfGlobalSettings.pcard_layout == 5" :product="p" :pIndex="index" :result="result" :key="p.id"></usf-sr-griditem5>
                    </template>
                </template>
                <template v-else>
                    <template v-for="p in result.items"><usf-sr-listitem :product="p" :result="result" :key="p.id"></usf-sr-listitem></template>
                </template>
            </template>
            <template v-else>
                <!-- Empty result -->
                <div class="usf-sr-empty">
                    <div class="usf-icon"></div>
                    <span v-html="term ? usf.utils.format(loc.productSearchNoResults, usf.utils.encodeHtml(term)) : loc.productSearchNoResultsEmptyTerm"></span>
                    <button v-if="facetFilters" class="usf-btn usf-btn-action" v-html="loc.clearAllFilters" @click="usf.queryRewriter.removeAllFacetFilters"></button>
                </div>
            </template>
        </template>
    </div>

    <usf-sr-banner v-if="result && result.extra && result.extra.banner && result.extra.banner.isBottom" :banner="result.extra.banner"></usf-sr-banner>

    <!-- Paging & load more -->
    <div class="usf-sr-paging" v-if="loader !== true">
        <div class="usf-sr-more" v-if="hasResults && usf.settings.search.more === 'more'">
            <div class="usf-title" v-html="usf.utils.format(loc.youHaveViewed, itemsLoaded, result.total)"></div>
            <div class="usf-progress">
                <div :style="{width: (itemsLoaded * 100 / result.total) + '%'}"></div>
            </div>
            <button v-if="itemsLoaded < result.total" class="usf-load-more" :class="{'usf-with-loader': loader === 'more'}" @click="onLoadMore"><span v-html="loc.loadMore"></span></button>
        </div>
        <usf-sr-pages v-else-if="hasResults && usf.settings.search.more === 'page'" :page="page" :pages-total="pagesTotal" :pages-to-display="4" :side-pages-to-display="1"></usf-sr-pages>
        <div class="usf-sr-loader usf-with-loader" v-else-if="loader === 'more'"></div>
    </div>
</div>
`,
    // Grid view item
    searchResultsGridViewItem: `
<div class="m-product-item m:w-6/12 md:m:w-4/12">
    <div :data-usf-pid="product.id" class="m-product-card m-product-card--style-1" :class="[{'m-product-card--soldout': isSoldOut,'m-product-card--onsale':hasDiscount,'m-product-card--show-second-img': _usfGlobalSettings.show_second_img && hoverImage},window._usf_animated ? 'm-scroll-trigger animate--' + window._usf_animation_effect: '']" data-view="card" :data-product-id="product.id" :data-cascade="window._usf_animated" :style="window._usf_animated ? '--animation-order:' + pIndex + ';' : false">
        <div class="m-product-card__media">
            <!-- Wishlist -->
            <usf-plugin name="searchResultsProductWishList" :data="pluginData"></usf-plugin>
            <!-- Labels -->
            <usf-plugin name="searchResultsProductLabel" :data="pluginData"></usf-plugin>
            <a class="m-product-card__link m:block m:w-full" :href="productUrl" @click="onItemClick" @mouseover="onItemHover" @mouseleave="onItemLeave" :aria-label="product.title">
                <template v-if="product.images.length">
                    <div class="m-product-card__main-image">
                        <responsive-image class="m-image" :style="'-aspect-ratio:' + imageRatio">
                            <img :srcset="_usfGetSrcset(selectedImage,scaledSelectedImageUrl)" :src="selectedImageUrl" :sizes="_usfSizes" :alt="selectedImage.alt" loading="lazy" class="m:w-full m:h-full" :width="selectedImage.width" :height="selectedImage.height">
                        </responsive-image>
                    </div>
                    <div v-if="_usfGlobalSettings.show_second_img && hoverImage" class="m-product-card__hover-image">
                        <responsive-image class="m-image" :style="'-aspect-ratio:' + imageRatio">
                            <img :srcset="_usfGetSrcset(hoverImage,scaledHoverImageUrl)" :sizes="_usfSizes" :alt="hoverImage.alt" loading="lazy" class="m:w-full m:h-full" :width="hoverImage.width" :height="hoverImage.height">
                        </responsive-image>
                    </div>
                </template>
                <template v-else>
                    <responsive-image v-if="_usfGlobalSettings.pcard_default_image" class="m-image" :style="window._usf_animated ? '--animation-order:' + pIndex + ';' : false">
                        <img :srcset="_usfGlobalSettings.pcard_default_image.srcset" :src="_usfGlobalSettings.pcard_default_image.src" :sizes="_usfSizes" :alt="product.title" loading="lazy" class="m:w-full m:h-full" :width="_usfGlobalSettings.pcard_default_image.width" :height="_usfGlobalSettings.pcard_default_image.height">
                    </responsive-image>
                    <div v-else :style="window._usf_animated ? '--animation-order:' + pIndex + ';' : false" v-html="_usfNoImageSvg"></div>
                </template>
            </a> 
            <!--badges-->
            <div class="m-product-card__tags">
                <template v-if="_usfGlobalSettings.show_badge_sale && tagBadges.length">
                    <span v-for="t in tagBadges" class="m-product-card__tag-name m-product-tag " :style="t.color_schema_style" :class="['m-product-tag--' + t.type,t.color_scheme_class]" v-html="t.tag_name"></span>
                </template>
                <span class="m-product-card__tag-name m-product-tag m-product-tag--preorder m-gradient m-color-dark" :style="_usfGlobalSettings.preorder_badge_color_scheme" :data-foxkit-preorder-badge="product.id"></span>
                <span v-if="_usfGlobalSettings.on_sale_badge && usf.settings.search.showSale && hasDiscount" class="m-product-card__tag-name m-product-tag m-product-tag--sale m-gradient m-color-badge-sale" v-bind:style="_usfGlobalSettings.sale_badge_color_scheme" v-html="_usfGlobalSettings.on_sale_badge == 'show_percentage' ? '-' + salePercent + '%'  : loc.sale"></span>
            </div>
            <span v-if="_usfGlobalSettings.show_badge_soldout && usf.settings.search.showSoldOut && isSoldOut" class="m-product-tag m-product-tag--soldout m-gradient m-color-footer" :style="_usfGlobalSettings.soldout_badge_color_scheme" v-html="loc.soldOut"></span>

            <div v-if="_usfGlobalSettings.show_wishlist_button || _usfGlobalSettings.show_compare_button || _usfGlobalSettings.show_quickview_button || _usfGlobalSettings.show_cart_button" class="m-product-card__action m-product-card__action--top m-product-card__addons m:display-flex">
                <usf-tooltip v-if="_usfGlobalSettings.show_cart_button" :type="'add-to-cart'" :className="'m-tooltip--top m-product-card__atc-button'" :product="product" :loc="loc" :isSoldOut="isSoldOut" :productUrl="productUrl" :hasOnlyDefaultVariant="hasOnlyDefaultVariant" :selectedVariantForPrice="selectedVariantForPrice"></usf-tooltip>
                <usf-tooltip v-if="_usfGlobalSettings.show_wishlist_button" :type="'wishlist'" :product="product" :loc="loc" :isSoldOut="isSoldOut" :productUrl="productUrl" :className="'m-tooltip--left'" :hasOnlyDefaultVariant="hasOnlyDefaultVariant" :selectedVariantForPrice="selectedVariantForPrice"></usf-tooltip>
                <usf-tooltip v-if="_usfGlobalSettings.show_compare_button" :type="'compare'" :className="'m-tooltip--left'" :product="product" :loc="loc" :isSoldOut="isSoldOut" :productUrl="productUrl" :hasOnlyDefaultVariant="hasOnlyDefaultVariant" :selectedVariantForPrice="selectedVariantForPrice"></usf-tooltip>
                <usf-tooltip v-if="_usfGlobalSettings.show_quickview_button" :type="'quickview'" :className="'m-tooltip--left'" :product="product" :loc="loc" :isSoldOut="isSoldOut" :productUrl="productUrl" :hasOnlyDefaultVariant="hasOnlyDefaultVariant" :selectedVariantForPrice="selectedVariantForPrice"></usf-tooltip>
            </div>
            <!--
        {% liquid
            assign metafields_time = product.metafields.global['minimog_countdown']
            if settings.show_countdown and metafields_time != blank
            render 'countdown-timer', time: metafields_time, separator: false, short_label: true, extra_classes: 'm-product-card__countdown m:hidden' 
            endif
        %}-->

            <div v-if="!isSoldOut" class="m-product-card__action m:hidden lg:m:block">
                <usf-quick-add-btn :productUrl="productUrl" :product="product" :btnStyle="'white'" :hasOnlyDefaultVariant="hasOnlyDefaultVariant" :isSoldOut="isSoldOut" :selectedVariantForPrice="selectedVariantForPrice" :loc="loc"></usf-quick-add-btn>
            </div>
        </div>
        <div :class="'m-product-card__content m:text-' + _usfGlobalSettings.pcard_alignment">
            <div class="m-product-card__info">
                <!--vendor-->
                <span v-if="_usfGlobalSettings.show_vendor && usf.settings.search.showVendor" class="m-product-card__vendor" v-html="product.vendor"></span>
                <h3 class="m-product-card__title">
                    <a :href="productUrl" class="m-product-card__name" :class="{'m:uppercase': _usfGlobalSettings.uppercase_prd_name}" v-html="product.title"></a>
                </h3>
                <div class="m-product-card__reviews m:text-color-body">
                    <usf-plugin name="searchResultsProductReview2" :data="pluginData"></usf-plugin>
                </div>
                <div class="m-product-card__price">
                    `+_usfPrice+`
                </div>
                <usf-swatches v-if="_usfGlobalSettings.show_swatch_option" :product="product" :selectedImage="selectedImage"></usf-swatches>
                <usf-inventory v-if="_usfGlobalSettings.pcard_show_inventory" :product="product" :selectedVariant="selectedVariantForPrice"></usf-inventory>
            </div>
            <!-- Swatch-->
            <usf-plugin name="searchResultsProductSwatch" :data="pluginData"></usf-plugin>
            <div class="m-product-card__content-footer">
                <div class="m-product-card__description" v-html="_usfListDesc(product.description)"></div>
                <div class="m-product-card__action">
                    <usf-quick-add-btn :product="product" :productUrl="productUrl" :hasOnlyDefaultVariant="hasOnlyDefaultVariant" :isSoldOut="isSoldOut" :selectedVariantForPrice="selectedVariantForPrice" :loc="loc"></usf-quick-add-btn>

                    <div class="m-product-card__action-icons">
                        <usf-tooltip v-if="_usfGlobalSettings.show_cart_button" :type="'add-to-cart'" :className="'m-tooltip--top m-product-card__atc-button'" :product="product" :loc="loc" :isSoldOut="isSoldOut" :productUrl="productUrl" :hasOnlyDefaultVariant="hasOnlyDefaultVariant" :selectedVariantForPrice="selectedVariantForPrice"></usf-tooltip>
                        <usf-tooltip v-if="_usfGlobalSettings.show_wishlist_button" :type="'wishlist'" :product="product" :loc="loc" :isSoldOut="isSoldOut" :productUrl="productUrl" :className="'m-tooltip--top'" :hasOnlyDefaultVariant="hasOnlyDefaultVariant" :selectedVariantForPrice="selectedVariantForPrice"></usf-tooltip>
                        <usf-tooltip v-if="_usfGlobalSettings.show_compare_button" :type="'compare'" :className="'m-tooltip--top'" :product="product" :loc="loc" :isSoldOut="isSoldOut" :productUrl="productUrl" :hasOnlyDefaultVariant="hasOnlyDefaultVariant" :selectedVariantForPrice="selectedVariantForPrice"></usf-tooltip>
                        <usf-tooltip v-if="_usfGlobalSettings.show_quickview_button" :type="'quickview'" :className="'m-tooltip--top'" :product="product" :loc="loc" :isSoldOut="isSoldOut" :productUrl="productUrl" :hasOnlyDefaultVariant="hasOnlyDefaultVariant" :selectedVariantForPrice="selectedVariantForPrice"></usf-tooltip>
                    </div>
                </div>
            </div>
        </div>
        <input hidden name="id" required :value="selectedVariantForPrice.id" :data-selected-variant="selectedVariantForPrice.id">
    </div>
</div>
`,
searchResultsGridViewItem2: `
<div class="m-product-item m:w-6/12 md:m:w-4/12">
    <div :data-usf-pid="product.id" class="m-product-card m-product-card--style-2" :class="[{'m-product-card--soldout': isSoldOut,'m-product-card--onsale':hasDiscount,'m-product-card--show-second-img': _usfGlobalSettings.show_second_img && hoverImage},window._usf_animated ? 'm-scroll-trigger animate--' + window._usf_animation_effect: '']" data-view="card" :data-product-id="product.id" :data-cascade="window._usf_animated" :style="window._usf_animated ? '--animation-order:' + pIndex + ';' : false">
        <div class="m-product-card__media">
            <!-- Wishlist -->
            <usf-plugin name="searchResultsProductWishList" :data="pluginData"></usf-plugin>
            <!-- Labels -->
            <usf-plugin name="searchResultsProductLabel" :data="pluginData"></usf-plugin>
            <a class="m-product-card__link m:block m:w-full" :href="productUrl" @click="onItemClick" @mouseover="onItemHover" @mouseleave="onItemLeave" :aria-label="product.title">
                <template v-if="product.images.length">
                    <div class="m-product-card__main-image">
                        <responsive-image class="m-image" :style="'-aspect-ratio:' + imageRatio">
                            <img :srcset="_usfGetSrcset(selectedImage,scaledSelectedImageUrl)" :src="selectedImageUrl" :sizes="_usfSizes" :alt="selectedImage.alt" loading="lazy" class="m:w-full m:h-full" :width="selectedImage.width" :height="selectedImage.height">
                        </responsive-image>
                    </div>
                    <div v-if="_usfGlobalSettings.show_second_img && hoverImage" class="m-product-card__hover-image">
                        <responsive-image class="m-image" :style="'-aspect-ratio:' + imageRatio">
                            <img :srcset="_usfGetSrcset(hoverImage,scaledHoverImageUrl)" :sizes="_usfSizes" :alt="hoverImage.alt" loading="lazy" class="m:w-full m:h-full" :width="hoverImage.width" :height="hoverImage.height">
                        </responsive-image>
                    </div>
                </template>
                <template v-else>
                    <responsive-image v-if="_usfGlobalSettings.pcard_default_image" class="m-image" :style="window._usf_animated ? '--animation-order:' + pIndex + ';' : false">
                        <img :srcset="_usfGlobalSettings.pcard_default_image.srcset" :src="_usfGlobalSettings.pcard_default_image.src" :sizes="_usfSizes" :alt="product.title" loading="lazy" class="m:w-full m:h-full" :width="_usfGlobalSettings.pcard_default_image.width" :height="_usfGlobalSettings.pcard_default_image.height">
                    </responsive-image>
                    <div v-else :style="window._usf_animated ? '--animation-order:' + pIndex + ';' : false" v-html="_usfNoImageSvg"></div>
                </template>
            </a>
            <!--badges-->
            <div class="m-product-card__tags">
                <template v-if="_usfGlobalSettings.show_badge_sale && tagBadges.length">
                    <span v-for="t in tagBadges" class="m-product-card__tag-name m-product-tag " :style="t.color_schema_style" :class="['m-product-tag--' + t.type,t.color_scheme_class]" v-html="t.tag_name"></span>
                </template>
                <span class="m-product-card__tag-name m-product-tag m-product-tag--preorder m-gradient m-color-dark" :style="_usfGlobalSettings.preorder_badge_color_scheme" :data-foxkit-preorder-badge="product.id"></span>
                <span v-if="_usfGlobalSettings.on_sale_badge && usf.settings.search.showSale && hasDiscount" class="m-product-card__tag-name m-product-tag m-product-tag--sale m-gradient m-color-badge-sale" v-bind:style="_usfGlobalSettings.sale_badge_color_scheme" v-html="_usfGlobalSettings.on_sale_badge == 'show_percentage' ? '-' + salePercent + '%'  : loc.sale"></span>
            </div>
            <span v-if="_usfGlobalSettings.show_badge_soldout && usf.settings.search.showSoldOut && isSoldOut" class="m-product-tag m-product-tag--soldout m-gradient m-color-footer" :style="_usfGlobalSettings.soldout_badge_color_scheme" v-html="loc.soldOut"></span>

            <div v-if="_usfGlobalSettings.show_cart_button || _usfGlobalSettings.show_wishlist_button || _usfGlobalSettings.show_compare_button || _usfGlobalSettings.show_quickview_button" class="m-product-card__action m-product-card__addons m:display-flex">
                <usf-tooltip v-if="_usfGlobalSettings.show_wishlist_button" :type="'wishlist'" :product="product" :loc="loc" :isSoldOut="isSoldOut" :productUrl="productUrl" :className="'m-tooltip--top'" :hasOnlyDefaultVariant="hasOnlyDefaultVariant" :selectedVariantForPrice="selectedVariantForPrice"></usf-tooltip>
                <usf-tooltip v-if="_usfGlobalSettings.show_cart_button" :type="'add-to-cart'" :className="'m-tooltip--top'" :product="product" :loc="loc" :isSoldOut="isSoldOut" :productUrl="productUrl" :hasOnlyDefaultVariant="hasOnlyDefaultVariant" :selectedVariantForPrice="selectedVariantForPrice"></usf-tooltip>
                <usf-tooltip v-if="_usfGlobalSettings.show_quickview_button" :type="'quickview'" :className="'m-tooltip--top'" :product="product" :loc="loc" :isSoldOut="isSoldOut" :productUrl="productUrl" :hasOnlyDefaultVariant="hasOnlyDefaultVariant" :selectedVariantForPrice="selectedVariantForPrice"></usf-tooltip>
                <usf-tooltip v-if="_usfGlobalSettings.show_compare_button" :type="'compare'" :className="'m-tooltip--top'" :product="product" :loc="loc" :isSoldOut="isSoldOut" :productUrl="productUrl" :hasOnlyDefaultVariant="hasOnlyDefaultVariant" :selectedVariantForPrice="selectedVariantForPrice"></usf-tooltip>
            </div>
            <!--
        {% liquid
            assign metafields_time = product.metafields.global['minimog_countdown']
            if settings.show_countdown and metafields_time != blank
            render 'countdown-timer', time: metafields_time, separator: false, short_label: true, extra_classes: 'm-product-card__countdown m:hidden' 
            endif
        %}-->
        </div>
        <div :class="'m-product-card__content m:text-' + _usfGlobalSettings.pcard_alignment">
            <div class="m-product-card__info">
                <!--vendor-->
                <span v-if="_usfGlobalSettings.show_vendor && usf.settings.search.showVendor" class="m-product-card__vendor" v-html="product.vendor"></span>
                <h3 class="m-product-card__title">
                    <a :href="productUrl" class="m-product-card__name" :class="{'m:uppercase': _usfGlobalSettings.uppercase_prd_name}" v-html="product.title"></a>
                </h3>
                <div class="m-product-card__reviews m:text-color-body"> 
 

                    <div data-fera-widget="product_collection_rating" 
                        data-fera-id="fwid_2spwsHE"
                        :data-rating-count="usf.utils.getMetafield(product,'reviews','rating_count')"
                        :data-rating-average="usf.utils.getMetafield(product,'reviews','rating') ? JSON.parse(usf.utils.getMetafield(product,'reviews','rating')).value : null" 
                        :data-product_id="product.id" >
                    </div>

                </div>
                <div class="m-product-card__price">
                    `+_usfPrice+`
                </div>
                <usf-swatches v-if="_usfGlobalSettings.show_swatch_option" :product="product" :selectedImage="selectedImage"></usf-swatches>
                <usf-inventory v-if="_usfGlobalSettings.pcard_show_inventory" :product="product" :selectedVariant="selectedVariantForPrice"></usf-inventory>
            </div>
            <!-- Swatch-->
            <usf-plugin name="searchResultsProductSwatch" :data="pluginData"></usf-plugin>
            <div class="m-product-card__content-footer">
                <div class="m-product-card__description" v-html="_usfListDesc(product.description)"></div>
                <div class="m-product-card__action">
                    <usf-quick-add-btn :productUrl="productUrl" :product="product" :hasOnlyDefaultVariant="hasOnlyDefaultVariant" :isSoldOut="isSoldOut" :selectedVariantForPrice="selectedVariantForPrice" :loc="loc"></usf-quick-add-btn>

                    <div class="m-product-card__action-icons">
                        <usf-tooltip v-if="_usfGlobalSettings.show_cart_button" :type="'add-to-cart'" :className="'sm-tooltip--top m-product-card__atc-button'" :product="product" :loc="loc" :isSoldOut="isSoldOut" :productUrl="productUrl" :hasOnlyDefaultVariant="hasOnlyDefaultVariant" :selectedVariantForPrice="selectedVariantForPrice"></usf-tooltip>
                        <usf-tooltip v-if="_usfGlobalSettings.show_wishlist_button" :type="'wishlist'" :product="product" :loc="loc" :isSoldOut="isSoldOut" :productUrl="productUrl" :className="'m-tooltip--top'" :hasOnlyDefaultVariant="hasOnlyDefaultVariant" :selectedVariantForPrice="selectedVariantForPrice"></usf-tooltip>
                        <usf-tooltip v-if="_usfGlobalSettings.show_compare_button" :type="'compare'" :className="'m-tooltip--top'" :product="product" :loc="loc" :isSoldOut="isSoldOut" :productUrl="productUrl" :hasOnlyDefaultVariant="hasOnlyDefaultVariant" :selectedVariantForPrice="selectedVariantForPrice"></usf-tooltip>
                        <usf-tooltip v-if="_usfGlobalSettings.show_quickview_button" :type="'quickview'" :className="'m-tooltip--top'" :product="product" :loc="loc" :isSoldOut="isSoldOut" :productUrl="productUrl" :hasOnlyDefaultVariant="hasOnlyDefaultVariant" :selectedVariantForPrice="selectedVariantForPrice"></usf-tooltip>
                    </div>
                </div>
            </div>
        </div>
        <div class='m-product-card__background-expand'></div>
        <input hidden name="id" required :value="selectedVariantForPrice.id" :data-selected-variant="selectedVariantForPrice.id">
    </div>
</div>
`,
searchResultsGridViewItem3: `
<div class="m-product-item m:w-6/12 md:m:w-4/12">
    <div :data-usf-pid="product.id" class="m-product-card m-product-card--style-3" :class="[{'m-product-card--soldout': isSoldOut,'m-product-card--onsale':hasDiscount,'m-product-card--show-second-img': _usfGlobalSettings.show_second_img && hoverImage},window._usf_animated ? 'm-scroll-trigger animate--' + window._usf_animation_effect: '']" data-view="card" :data-product-id="product.id" :data-cascade="window._usf_animated" :style="window._usf_animated ? '--animation-order:' + pIndex + ';' : false">
        <div class="m-product-card__media">
            <!-- Wishlist -->
            <usf-plugin name="searchResultsProductWishList" :data="pluginData"></usf-plugin>
            <!-- Labels -->
            <usf-plugin name="searchResultsProductLabel" :data="pluginData"></usf-plugin>
            <a class="m-product-card__link m:block m:w-full" :href="productUrl" @click="onItemClick" @mouseover="onItemHover" @mouseleave="onItemLeave" :aria-label="product.title">
                <template v-if="product.images.length">
                    <div class="m-product-card__main-image">
                        <responsive-image class="m-image" :style="'-aspect-ratio:' + imageRatio">
                            <img :srcset="_usfGetSrcset(selectedImage,scaledSelectedImageUrl)" :src="selectedImageUrl" :sizes="_usfSizes" :alt="selectedImage.alt" loading="lazy" class="m:w-full m:h-full" :width="selectedImage.width" :height="selectedImage.height">
                        </responsive-image>
                    </div>
                    <div v-if="_usfGlobalSettings.show_second_img && hoverImage" class="m-product-card__hover-image">
                        <responsive-image class="m-image" :style="'-aspect-ratio:' + imageRatio">
                            <img :srcset="_usfGetSrcset(hoverImage,scaledHoverImageUrl)" :sizes="_usfSizes" :alt="hoverImage.alt" loading="lazy" class="m:w-full m:h-full" :width="hoverImage.width" :height="hoverImage.height">
                        </responsive-image>
                    </div>
                </template>
                <template v-else>
                    <responsive-image v-if="_usfGlobalSettings.pcard_default_image" class="m-image" :style="window._usf_animated ? '--animation-order:' + pIndex + ';' : false">
                        <img :srcset="_usfGlobalSettings.pcard_default_image.srcset" :src="_usfGlobalSettings.pcard_default_image.src" :sizes="_usfSizes" :alt="product.title" loading="lazy" class="m:w-full m:h-full" :width="_usfGlobalSettings.pcard_default_image.width" :height="_usfGlobalSettings.pcard_default_image.height">
                    </responsive-image>
                    <div v-else :style="window._usf_animated ? '--animation-order:' + pIndex + ';' : false" v-html="_usfNoImageSvg"></div>
                </template>
            </a>
            <!--badges-->
            <div class="m-product-card__tags">
                <template v-if="_usfGlobalSettings.show_badge_sale && tagBadges.length">
                    <span v-for="t in tagBadges" class="m-product-card__tag-name m-product-tag " :style="t.color_schema_style" :class="['m-product-tag--' + t.type,t.color_scheme_class]" v-html="t.tag_name"></span>
                </template>
                <span class="m-product-card__tag-name m-product-tag m-product-tag--preorder m-gradient m-color-dark" :style="_usfGlobalSettings.preorder_badge_color_scheme" :data-foxkit-preorder-badge="product.id"></span>
                <span v-if="_usfGlobalSettings.on_sale_badge && usf.settings.search.showSale && hasDiscount" class="m-product-card__tag-name m-product-tag m-product-tag--sale m-gradient m-color-badge-sale" v-bind:style="_usfGlobalSettings.sale_badge_color_scheme" v-html="_usfGlobalSettings.on_sale_badge == 'show_percentage' ? '-' + salePercent + '%'  : loc.sale"></span>
            </div>
                <span v-if="_usfGlobalSettings.show_badge_soldout && usf.settings.search.showSoldOut && isSoldOut" class="m-product-tag m-product-tag--soldout m-gradient m-color-footer" :style="_usfGlobalSettings.soldout_badge_color_scheme" v-html="loc.soldOut"></span>
            <div v-if="_usfGlobalSettings.show_wishlist_button" class="m-product-card__action m-product-card__action--top m:hidden md:m:flex">
                <usf-tooltip :type="'wishlist'" :product="product" :loc="loc" :isSoldOut="isSoldOut" :productUrl="productUrl" :className="'m-tooltip--left'" :hasOnlyDefaultVariant="hasOnlyDefaultVariant" :selectedVariantForPrice="selectedVariantForPrice"></usf-tooltip>
            </div>
            <div v-if="_usfGlobalSettings.show_cart_button || _usfGlobalSettings.show_compare_button || _usfGlobalSettings.show_quickview_button || _usfGlobalSettings.show_wishlist_button" class="m-product-card__action m-product-card__addons m:flex">
                <usf-tooltip v-if="_usfGlobalSettings.show_cart_button" :type="'add-to-cart'" :className="'m-tooltip--top'" :product="product" :loc="loc" :isSoldOut="isSoldOut" :productUrl="productUrl" :hasOnlyDefaultVariant="hasOnlyDefaultVariant" :selectedVariantForPrice="selectedVariantForPrice"></usf-tooltip>
                <usf-tooltip v-if="_usfGlobalSettings.show_compare_button" :type="'compare'" :className="'m-tooltip--top'" :product="product" :loc="loc" :isSoldOut="isSoldOut" :productUrl="productUrl" :hasOnlyDefaultVariant="hasOnlyDefaultVariant" :selectedVariantForPrice="selectedVariantForPrice"></usf-tooltip>
                <usf-tooltip v-if="_usfGlobalSettings.show_quickview_button" :type="'quickview'" :className="'m-tooltip--top'" :product="product" :loc="loc" :isSoldOut="isSoldOut" :productUrl="productUrl" :hasOnlyDefaultVariant="hasOnlyDefaultVariant" :selectedVariantForPrice="selectedVariantForPrice"></usf-tooltip>
                <usf-tooltip v-if="_usfGlobalSettings.show_wishlist_button" :type="'wishlist'" :product="product" :loc="loc" :isSoldOut="isSoldOut" :productUrl="productUrl" :className="'m-tooltip--top'" :hasOnlyDefaultVariant="hasOnlyDefaultVariant" :selectedVariantForPrice="selectedVariantForPrice"></usf-tooltip>
            </div>
            <!--
        {% liquid
            assign metafields_time = product.metafields.global['minimog_countdown']
            if settings.show_countdown and metafields_time != blank
            render 'countdown-timer', time: metafields_time, separator: false, short_label: true, extra_classes: 'm-product-card__countdown m:hidden' 
            endif
        %}-->

        </div>
        <div :class="'m-product-card__content m:text-' + _usfGlobalSettings.pcard_alignment">
            <div class="m-product-card__info">
                <!--vendor-->
                <span v-if="_usfGlobalSettings.show_vendor && usf.settings.search.showVendor" class="m-product-card__vendor" v-html="product.vendor"></span>
                <h3 class="m-product-card__title">
                    <a :href="productUrl" class="m-product-card__name" :class="{'m:uppercase': _usfGlobalSettings.uppercase_prd_name}" v-html="product.title"></a>
                </h3>
                <div class="m-product-card__reviews m:text-color-body">
                    <usf-plugin name="searchResultsProductReview2" :data="pluginData"></usf-plugin>
                </div>
                <div class="m-product-card__price">
                    `+_usfPrice+`
                </div>
                <usf-swatches v-if="_usfGlobalSettings.show_swatch_option" :product="product" :selectedImage="selectedImage"></usf-swatches>
                <usf-inventory v-if="_usfGlobalSettings.pcard_show_inventory" :product="product" :selectedVariant="selectedVariantForPrice"></usf-inventory>
            </div>
            <!-- Swatch-->
            <usf-plugin name="searchResultsProductSwatch" :data="pluginData"></usf-plugin>
            <div class="m-product-card__content-footer">
                <div class="m-product-card__description" v-html="_usfListDesc(product.description)"></div>
                <div class="m-product-card__action">
                    <usf-quick-add-btn :productUrl="productUrl" :product="product" :hasOnlyDefaultVariant="hasOnlyDefaultVariant" :isSoldOut="isSoldOut" :selectedVariantForPrice="selectedVariantForPrice" :loc="loc"></usf-quick-add-btn>

                    <div class="m-product-card__action-icons">
                        <usf-tooltip v-if="_usfGlobalSettings.show_cart_button" :type="'add-to-cart'" :className="'m-tooltip--top m-product-card__atc-button'" :product="product" :loc="loc" :isSoldOut="isSoldOut" :productUrl="productUrl" :hasOnlyDefaultVariant="hasOnlyDefaultVariant" :selectedVariantForPrice="selectedVariantForPrice"></usf-tooltip>
                        <usf-tooltip v-if="_usfGlobalSettings.show_wishlist_button" :type="'wishlist'" :product="product" :loc="loc" :isSoldOut="isSoldOut" :productUrl="productUrl" :className="'m-tooltip--top'" :hasOnlyDefaultVariant="hasOnlyDefaultVariant" :selectedVariantForPrice="selectedVariantForPrice"></usf-tooltip>
                        <usf-tooltip v-if="_usfGlobalSettings.show_compare_button" :type="'compare'" :className="'m-tooltip--top'" :product="product" :loc="loc" :isSoldOut="isSoldOut" :productUrl="productUrl" :hasOnlyDefaultVariant="hasOnlyDefaultVariant" :selectedVariantForPrice="selectedVariantForPrice"></usf-tooltip>
                        <usf-tooltip v-if="_usfGlobalSettings.show_quickview_button" :type="'quickview'" :className="'m-tooltip--top'" :product="product" :loc="loc" :isSoldOut="isSoldOut" :productUrl="productUrl" :hasOnlyDefaultVariant="hasOnlyDefaultVariant" :selectedVariantForPrice="selectedVariantForPrice"></usf-tooltip>
                    </div>
                </div>
            </div>
        </div>
        <div class='m-product-card__background-expand'></div>
        <input hidden name="id" required :value="selectedVariantForPrice.id" :data-selected-variant="selectedVariantForPrice.id">
    </div>
</div>`,
searchResultsGridViewItem4: `
<div class="m-product-item m:w-6/12 md:m:w-4/12">
    <div :data-usf-pid="product.id" class="m-product-card m-product-card--style-4" :class="[{'m-product-card--soldout': isSoldOut,'m-product-card--onsale':hasDiscount,'m-product-card--show-second-img': _usfGlobalSettings.show_second_img && hoverImage},window._usf_animated ? 'm-scroll-trigger animate--' + window._usf_animation_effect: '']" data-view="card" :data-product-id="product.id" :data-cascade="window._usf_animated" :style="window._usf_animated ? '--animation-order:' + pIndex + ';' : false">
        <div class="m-product-card__media">
            <!-- Wishlist -->
            <usf-plugin name="searchResultsProductWishList" :data="pluginData"></usf-plugin>
            <!-- Labels -->
            <usf-plugin name="searchResultsProductLabel" :data="pluginData"></usf-plugin>
            <a class="m-product-card__link m:block m:w-full" :href="productUrl" @click="onItemClick" @mouseover="onItemHover" @mouseleave="onItemLeave" :aria-label="product.title">
                <template v-if="product.images.length">
                    <div class="m-product-card__main-image">
                        <responsive-image class="m-image" :style="'-aspect-ratio:' + imageRatio">
                            <img :srcset="_usfGetSrcset(selectedImage,scaledSelectedImageUrl)" :src="selectedImageUrl" :sizes="_usfSizes" :alt="selectedImage.alt" loading="lazy" class="m:w-full m:h-full" :width="selectedImage.width" :height="selectedImage.height">
                        </responsive-image>
                    </div>
                    <div v-if="_usfGlobalSettings.show_second_img && hoverImage" class="m-product-card__hover-image">
                        <responsive-image class="m-image" :style="'-aspect-ratio:' + imageRatio">
                            <img :srcset="_usfGetSrcset(hoverImage,scaledHoverImageUrl)" :sizes="_usfSizes" :alt="hoverImage.alt" loading="lazy" class="m:w-full m:h-full" :width="hoverImage.width" :height="hoverImage.height">
                        </responsive-image>
                    </div>
                </template>
                <template v-else>
                    <responsive-image v-if="_usfGlobalSettings.pcard_default_image" class="m-image" :style="window._usf_animated ? '--animation-order:' + pIndex + ';' : false">
                        <img :srcset="_usfGlobalSettings.pcard_default_image.srcset" :src="_usfGlobalSettings.pcard_default_image.src" :sizes="_usfSizes" :alt="product.title" loading="lazy" class="m:w-full m:h-full" :width="_usfGlobalSettings.pcard_default_image.width" :height="_usfGlobalSettings.pcard_default_image.height">
                    </responsive-image>
                    <div v-else :style="window._usf_animated ? '--animation-order:' + pIndex + ';' : false" v-html="_usfNoImageSvg"></div>
                </template>
            </a>
            <!--badges-->
            <div class="m-product-card__tags">
                <template v-if="_usfGlobalSettings.show_badge_sale && tagBadges.length">
                    <span v-for="t in tagBadges" class="m-product-card__tag-name m-product-tag " :style="t.color_schema_style" :class="['m-product-tag--' + t.type,t.color_scheme_class]" v-html="t.tag_name"></span>
                </template>
                <span class="m-product-card__tag-name m-product-tag m-product-tag--preorder m-gradient m-color-dark" :style="_usfGlobalSettings.preorder_badge_color_scheme" :data-foxkit-preorder-badge="product.id"></span>
                <span v-if="_usfGlobalSettings.on_sale_badge && usf.settings.search.showSale && hasDiscount" class="m-product-card__tag-name m-product-tag m-product-tag--sale m-gradient m-color-badge-sale" v-bind:style="_usfGlobalSettings.sale_badge_color_scheme" v-html="_usfGlobalSettings.on_sale_badge == 'show_percentage' ? '-' + salePercent + '%'  : loc.sale"></span>
                </div>
            <span v-if="_usfGlobalSettings.show_badge_soldout && usf.settings.search.showSoldOut && isSoldOut" class="m-product-tag m-product-tag--soldout m-gradient m-color-footer" :style="_usfGlobalSettings.soldout_badge_color_scheme" v-html="loc.soldOut"></span>

            <div v-if="_usfGlobalSettings.show_wishlist_button || _usfGlobalSettings.show_compare_button || _usfGlobalSettings.show_quickview_button" class="m-product-card__action m:hidden md:m:flex">
                <usf-tooltip v-if="_usfGlobalSettings.show_wishlist_button" :type="'wishlist'" :product="product" :loc="loc" :isSoldOut="isSoldOut" :productUrl="productUrl" :className="'m-tooltip--top'" :hasOnlyDefaultVariant="hasOnlyDefaultVariant" :selectedVariantForPrice="selectedVariantForPrice"></usf-tooltip>
                <usf-tooltip v-if="_usfGlobalSettings.show_compare_button" :type="'compare'" :className="'m-tooltip--top'" :product="product" :loc="loc" :isSoldOut="isSoldOut" :productUrl="productUrl" :hasOnlyDefaultVariant="hasOnlyDefaultVariant" :selectedVariantForPrice="selectedVariantForPrice"></usf-tooltip>
                <usf-tooltip v-if="_usfGlobalSettings.show_quickview_button" :type="'quickview'" :className="'m-tooltip--top'" :product="product" :loc="loc" :isSoldOut="isSoldOut" :productUrl="productUrl" :hasOnlyDefaultVariant="hasOnlyDefaultVariant" :selectedVariantForPrice="selectedVariantForPrice"></usf-tooltip>
            </div>
            <!--
        {% liquid
            assign metafields_time = product.metafields.global['minimog_countdown']
            if settings.show_countdown and metafields_time != blank
            render 'countdown-timer', time: metafields_time, separator: false, short_label: true, extra_classes: 'm-product-card__countdown m:hidden' 
            endif
        %}-->

        </div>
        <div :class="'m-product-card__content m:text-' + _usfGlobalSettings.pcard_alignment">
            <div class="m-product-card__info">
                <!--vendor-->
                <span v-if="_usfGlobalSettings.show_vendor && usf.settings.search.showVendor" class="m-product-card__vendor" v-html="product.vendor"></span>
                <h3 class="m-product-card__title">
                    <a :href="productUrl" class="m-product-card__name" :class="{'m:uppercase': _usfGlobalSettings.uppercase_prd_name}" v-html="product.title"></a>
                </h3>
                <div class="m-product-card__reviews m:text-color-body">
                    <usf-plugin name="searchResultsProductReview2" :data="pluginData"></usf-plugin>
                </div>
                <div class="m-product-card__price">
                    `+_usfPrice+`
                </div>
                <usf-inventory v-if="_usfGlobalSettings.pcard_show_inventory" :product="product" :selectedVariant="selectedVariantForPrice"></usf-inventory>
                <usf-swatches v-if="_usfGlobalSettings.show_swatch_option" :product="product" :selectedImage="selectedImage"></usf-swatches>
                
            </div>

            <!-- Swatch-->
            <usf-plugin name="searchResultsProductSwatch" :data="pluginData"></usf-plugin>
            <usf-quick-add-btn :productUrl="productUrl" v-if="!isSoldOut && _usfGlobalSettings.show_cart_button" :product="product" :hasOnlyDefaultVariant="hasOnlyDefaultVariant" :isSoldOut="isSoldOut" :selectedVariantForPrice="selectedVariantForPrice" :loc="loc"></usf-quick-add-btn>

            <div class="m-product-card__content-footer">
                <div class="m-product-card__description" v-html="_usfListDesc(product.description)"></div>
                <div class="m-product-card__action">
                    <usf-quick-add-btn :productUrl="productUrl" :product="product" :hasOnlyDefaultVariant="hasOnlyDefaultVariant" :isSoldOut="isSoldOut" :selectedVariantForPrice="selectedVariantForPrice" :loc="loc"></usf-quick-add-btn>

                    <div class="m-product-card__action-icons">
                        <usf-tooltip v-if="_usfGlobalSettings.show_cart_button" :type="'add-to-cart'" :className="'m-tooltip--top m-product-card__atc-button'" :product="product" :loc="loc" :isSoldOut="isSoldOut" :productUrl="productUrl" :hasOnlyDefaultVariant="hasOnlyDefaultVariant" :selectedVariantForPrice="selectedVariantForPrice"></usf-tooltip>
                        <usf-tooltip v-if="_usfGlobalSettings.show_wishlist_button" :type="'wishlist'" :product="product" :loc="loc" :isSoldOut="isSoldOut" :productUrl="productUrl" :className="'m-tooltip--top'" :hasOnlyDefaultVariant="hasOnlyDefaultVariant" :selectedVariantForPrice="selectedVariantForPrice"></usf-tooltip>
                        <usf-tooltip v-if="_usfGlobalSettings.show_compare_button" :type="'compare'" :className="'m-tooltip--top'" :product="product" :loc="loc" :isSoldOut="isSoldOut" :productUrl="productUrl" :hasOnlyDefaultVariant="hasOnlyDefaultVariant" :selectedVariantForPrice="selectedVariantForPrice"></usf-tooltip>
                        <usf-tooltip v-if="_usfGlobalSettings.show_quickview_button" :type="'quickview'" :className="'m-tooltip--top'" :product="product" :loc="loc" :isSoldOut="isSoldOut" :productUrl="productUrl" :hasOnlyDefaultVariant="hasOnlyDefaultVariant" :selectedVariantForPrice="selectedVariantForPrice"></usf-tooltip>
                    </div>
                </div>
            </div>
        </div>
        <input hidden name="id" required :value="selectedVariantForPrice.id" :data-selected-variant="selectedVariantForPrice.id">
    </div>
</div>`,
searchResultsGridViewItem5: `
<div class="m-product-item m:w-6/12 md:m:w-4/12">
    <div :data-usf-pid="product.id" class="m-product-card m-product-card--style-5" :class="[{'m-product-card--soldout': isSoldOut,'m-product-card--onsale':hasDiscount,'m-product-card--show-second-img': _usfGlobalSettings.show_second_img && hoverImage,'m-product-card--enable-wishlist': _usfGlobalSettings.show_wishlist_button},window._usf_animated ? 'm-scroll-trigger animate--' + window._usf_animation_effect: '']" data-view="card" :data-product-id="product.id" :data-cascade="window._usf_animated" :style="window._usf_animated ? '--animation-order:' + pIndex + ';' : false">
        <div class="m-product-card__media">
            <!-- Wishlist -->
            <usf-plugin name="searchResultsProductWishList" :data="pluginData"></usf-plugin>
            <!-- Labels -->
            <usf-plugin name="searchResultsProductLabel" :data="pluginData"></usf-plugin>
            <a class="m-product-card__link m:block m:w-full" :href="productUrl" @click="onItemClick" @mouseover="onItemHover" @mouseleave="onItemLeave" :aria-label="product.title">
                <template v-if="product.images.length">
                    <div class="m-product-card__main-image">
                        <responsive-image class="m-image" :style="'-aspect-ratio:' + imageRatio">
                            <img :srcset="_usfGetSrcset(selectedImage,scaledSelectedImageUrl)" :src="selectedImageUrl" :sizes="_usfSizes" :alt="selectedImage.alt" loading="lazy" class="m:w-full m:h-full" :width="selectedImage.width" :height="selectedImage.height">
                        </responsive-image>
                    </div>
                    <div v-if="_usfGlobalSettings.show_second_img && hoverImage" class="m-product-card__hover-image">
                        <responsive-image class="m-image" :style="'-aspect-ratio:' + imageRatio">
                            <img :srcset="_usfGetSrcset(hoverImage,scaledHoverImageUrl)" :sizes="_usfSizes" :alt="hoverImage.alt" loading="lazy" class="m:w-full m:h-full" :width="hoverImage.width" :height="hoverImage.height">
                        </responsive-image>
                    </div>
                </template>
                <template v-else>
                    <responsive-image v-if="_usfGlobalSettings.pcard_default_image" class="m-image" :style="window._usf_animated ? '--animation-order:' + pIndex + ';' : false">
                        <img :srcset="_usfGlobalSettings.pcard_default_image.srcset" :src="_usfGlobalSettings.pcard_default_image.src" :sizes="_usfSizes" :alt="product.title" loading="lazy" class="m:w-full m:h-full" :width="_usfGlobalSettings.pcard_default_image.width" :height="_usfGlobalSettings.pcard_default_image.height">
                    </responsive-image>
                    <div v-else :style="window._usf_animated ? '--animation-order:' + pIndex + ';' : false" v-html="_usfNoImageSvg"></div>
                </template>
            </a>
            <!--badges-->
            <div class="m-product-card__tags">
                <template v-if="_usfGlobalSettings.show_badge_sale && tagBadges.length">
                    <span v-for="t in tagBadges" class="m-product-card__tag-name m-product-tag " :style="t.color_schema_style" :class="['m-product-tag--' + t.type,t.color_scheme_class]" v-html="t.tag_name"></span>
                </template>
                <span class="m-product-card__tag-name m-product-tag m-product-tag--preorder m-gradient m-color-dark" :style="_usfGlobalSettings.preorder_badge_color_scheme" :data-foxkit-preorder-badge="product.id"></span>
                <span v-if="_usfGlobalSettings.on_sale_badge && usf.settings.search.showSale && hasDiscount" class="m-product-card__tag-name m-product-tag m-product-tag--sale m-gradient m-color-badge-sale" v-bind:style="_usfGlobalSettings.sale_badge_color_scheme" v-html="_usfGlobalSettings.on_sale_badge == 'show_percentage' ? '-' + salePercent + '%'  : loc.sale"></span>
            </div>
            <span v-if="_usfGlobalSettings.show_badge_soldout && usf.settings.search.showSoldOut && isSoldOut" class="m-product-tag m-product-tag--soldout m-gradient m-color-footer" :style="_usfGlobalSettings.soldout_badge_color_scheme" v-html="loc.soldOut"></span>
            <div v-if="_usfGlobalSettings.show_compare_button || _usfGlobalSettings.show_cart_button || _usfGlobalSettings.show_quickview_button" class="m-product-card__action m-product-card__action--top m-product-card__addons m:display-flex">
                <usf-tooltip v-if="_usfGlobalSettings.show_cart_button" :type="'add-to-cart'" :className="'m-tooltip--left'" :product="product" :loc="loc" :isSoldOut="isSoldOut" :productUrl="productUrl" :hasOnlyDefaultVariant="hasOnlyDefaultVariant" :selectedVariantForPrice="selectedVariantForPrice"></usf-tooltip>
                <usf-tooltip v-if="_usfGlobalSettings.show_compare_button" :type="'compare'" :className="'m-tooltip--left'" :product="product" :loc="loc" :isSoldOut="isSoldOut" :productUrl="productUrl" :hasOnlyDefaultVariant="hasOnlyDefaultVariant" :selectedVariantForPrice="selectedVariantForPrice"></usf-tooltip>
                <usf-tooltip v-if="_usfGlobalSettings.show_quickview_button" :type="'quickview'" :className="'m-tooltip--left'" :product="product" :loc="loc" :isSoldOut="isSoldOut" :productUrl="productUrl" :hasOnlyDefaultVariant="hasOnlyDefaultVariant" :selectedVariantForPrice="selectedVariantForPrice"></usf-tooltip>
            </div>
            <!--
        {% liquid
            assign metafields_time = product.metafields.global['minimog_countdown']
            if settings.show_countdown and metafields_time != blank
            render 'countdown-timer', time: metafields_time, separator: false, short_label: true, extra_classes: 'm-product-card__countdown m:hidden' 
            endif
        %}-->

        </div>
        <div :class="'m-product-card__content m:text-' + _usfGlobalSettings.pcard_alignment">
            <div class="m-product-card__info">
                <!--vendor-->
                <span v-if="_usfGlobalSettings.show_vendor && usf.settings.search.showVendor" class="m-product-card__vendor" v-html="product.vendor"></span>
                <h3 class="m-product-card__title">
                    <a :href="productUrl" class="m-product-card__name" :class="{'m:uppercase': _usfGlobalSettings.uppercase_prd_name}" v-html="product.title"></a>
                </h3>
                <div v-if="selectedVariantForPrice.sku" class="product-sku-archive" v-html="' SKU: ' + selectedVariantForPrice.sku"></div>
                <div class="m-product-card__reviews m:text-color-body">
                    <usf-plugin name="searchResultsProductReview2" :data="pluginData"></usf-plugin>
                </div>
                <div class="m-product-card__price">
                    `+_usfPrice+`
                </div>
                <usf-swatches v-if="_usfGlobalSettings.show_swatch_option" :product="product" :selectedImage="selectedImage"></usf-swatches>
                <div v-if="_usfGlobalSettings.show_wishlist_button" class="m-product-card__action">
                    <usf-tooltip  :type="'wishlist'" :product="product" :loc="loc" :isSoldOut="isSoldOut" :productUrl="productUrl" :className="'m-tooltip--left'" :hasOnlyDefaultVariant="hasOnlyDefaultVariant" :selectedVariantForPrice="selectedVariantForPrice"></usf-tooltip>
                </div>
            </div>
            <!-- Swatch-->
            <usf-plugin name="searchResultsProductSwatch" :data="pluginData"></usf-plugin>
            <usf-inventory v-if="_usfGlobalSettings.pcard_show_inventory" :product="product" :selectedVariant="selectedVariantForPrice"></usf-inventory>
            <div class="m-product-card__content-footer">
                <div class="m-product-card__description" v-html="_usfListDesc(product.description)"></div>
                <div class="m-product-card__action">
                    <usf-quick-add-btn :productUrl="productUrl" :product="product" :hasOnlyDefaultVariant="hasOnlyDefaultVariant" :isSoldOut="isSoldOut" :selectedVariantForPrice="selectedVariantForPrice" :loc="loc"></usf-quick-add-btn>

                    <div class="m-product-card__action-icons">
                        <usf-tooltip v-if="_usfGlobalSettings.show_cart_button" :type="'add-to-cart'" :className="'m-tooltip--top m-product-card__atc-button'" :product="product" :loc="loc" :isSoldOut="isSoldOut" :productUrl="productUrl" :hasOnlyDefaultVariant="hasOnlyDefaultVariant" :selectedVariantForPrice="selectedVariantForPrice"></usf-tooltip>
                        <usf-tooltip v-if="_usfGlobalSettings.show_wishlist_button" :type="'wishlist'" :product="product" :loc="loc" :isSoldOut="isSoldOut" :productUrl="productUrl" :className="'m-tooltip--top'" :hasOnlyDefaultVariant="hasOnlyDefaultVariant" :selectedVariantForPrice="selectedVariantForPrice"></usf-tooltip>
                        <usf-tooltip v-if="_usfGlobalSettings.show_compare_button" :type="'compare'" :className="'m-tooltip--top'" :product="product" :loc="loc" :isSoldOut="isSoldOut" :productUrl="productUrl" :hasOnlyDefaultVariant="hasOnlyDefaultVariant" :selectedVariantForPrice="selectedVariantForPrice"></usf-tooltip>
                        <usf-tooltip v-if="_usfGlobalSettings.show_quickview_button" :type="'quickview'" :className="'m-tooltip--top'" :product="product" :loc="loc" :isSoldOut="isSoldOut" :productUrl="productUrl" :hasOnlyDefaultVariant="hasOnlyDefaultVariant" :selectedVariantForPrice="selectedVariantForPrice"></usf-tooltip>
                    </div>
                </div>
            </div>
        </div>
        <input hidden name="id" required :value="selectedVariantForPrice.id" :data-selected-variant="selectedVariantForPrice.id">
    </div>
</div>`,
    // Search result pages
    searchResultsPages: `
<center class="m-collection--pagination m:text-center">
    <div class="m-pagination">
        <template v-for="e in elements">
            <span v-if="e.type === 'prev'" class="prev"><a href="javascript:void(0)" :title="loc.prevPage" @click="onPrev">«</a></span>
            <span v-else-if="e.type === 'dots'" class="deco">...</span>
            <span v-else-if="e.type === 'page' && e.current" class="page current">{{e.page}}</span>
            <span v-else-if="e.type === 'page' && !e.current" class="page"><a href="javascript:void(0)" @click="ev=>onPage(e.page,ev)" :title="usf.utils.format(loc.gotoPage,e.page)">{{e.page}}</a></span>
            <span v-else-if="e.type === 'next'" class="next"><a href="javascript:void(0)" :title="loc.nextPage" @click="onNext">»</a></span>
        </template>
    </div>
</center>
`,
    // List view item
    searchResultsListViewItem: /*inc_begin_search-list-item*/
`<a class="usf-sr-product" @click="onItemClick" @mouseover="onItemHover" @mouseleave="onItemLeave" :href="productUrl" :data-usf-pid="product.id">
    <!-- Image column -->
    <div class="usf-img-column">
        <!-- product image -->
        <div class="usf-img-wrapper usf-sr-product__image-container" :class="{'usf-has-second-img': hoverImage}">
            <div class="usf-main-img lazyload" :data-bgset="_usfGetScaledImageUrl(scaledSelectedImageUrl)" :style="{'background-image': 'url(' + getSelectedImageUrl('600') + ')'}"></div>
            <span class="usf-img-loader"></span>
            <template v-if="hoverImage">
                <div class="usf-second-img lazyload" :data-bgset="_usfGetScaledImageUrl(scaledHoverImageUrl)" :style="{'background-image': 'url(' + getHoverImageUrl('600') + ')'}"></div>
                <span class="usf-img-loader"></span>
            </template>
            <!-- product image extra -->
            <usf-plugin name="searchResultsProductPreview" :data="pluginData"></usf-plugin>
            <usf-plugin name="searchResultsProductCart" :data="pluginData"></usf-plugin>
            
            <div v-if="isSoldOut && usf.settings.search.showSoldOut" class="usf-badge"><span v-html="loc.soldOut"></span></div>
            <div v-else-if="hasDiscount && usf.settings.search.showSale" class="usf-badge usf-sale-badge"><span v-html="loc.sale"></span></div>
        </div>
    </div>

    <!-- Info column -->
    <div class="usf-info-column">
        <div class="usf-title" v-html="product.title"></div>
        <div class="usf-vendor" v-if="usf.settings.search.showVendor" v-html="product.vendor"></div>

        <!-- price -->
        <usf-plugin name="searchResultsProductPrice" :data="pluginData"></usf-plugin>
        <div class="usf-price-wrapper" :class="{'usf-price--sold-out': isSoldOut}" v-if="!usf.plugins.lastRenderResult" :data-variant-id="product.selectedVariantId">
            <span class="usf-price" :class="{'usf-has-discount': hasDiscount}" v-html="displayPrice"></span>
            <span class="usf-discount" v-if="hasDiscount" v-html="displayDiscountedPrice"></span>
            <span v-if="hasDiscount" class="usf-price-savings" v-html="loc.save + ' ' + salePercent + '%'"></span>
        </div>
        <div class="usf-description"></div>
    </div>
</a>`
/*inc_end_search-list-item*/,
    // AddToCart Plugin	
    addToCartPlugin: /*inc_begin_addtocart-plugin*/
`<form class="usf-add-to-cart" method="POST" enctype="multipart/form-data" :action="usf.platform.addToCartUrl">
    <input type="hidden" name="form_type" value="product">
    <input type="hidden" name="utf8" value="✓">
    <input type="hidden" name="quantity" value="1">
    <input type="hidden" name="id" :value="variant.id">
    <usf-choose-options v-if="args.product.variants.length > 1" :loc="usf.settings.translation" :args="args"></usf-choose-options>
    <button v-else-if="!usf.utils.isVariantSoldOut(variant)" type="submit" name="add" class="usf-add-to-cart-btn" :data-product-id="args.product.id" @click.prevent.stop="_usfAddToCart">
        <span class="usf-icon usf-icon-cart"></span>
        <span class="usf-label" v-html="loc.addToCart"></span>
    </button>
</form>`
/*inc_end_addtocart-plugin*/,

    // Preview Plugin
    previewPlugin: /*inc_begin_preview-plugin*/
`<div class="usf-sr-preview" :class="['usf-sr-' + settings.iconPosition]" @click.prevent.stop="onShowModal">
    <span class="usf-icon usf-icon-eye"></span>
</div>`
/*inc_end_preview-plugin*/,

    previewPluginModal: /*inc_begin_preview-modal*/
`<div><div class="usf-backdrop"></div><div class="usf-preview__wrapper usf-zone"><div class="usf-preview__container">
    <div class="usf-preview">
        <!-- Close button -->
        <div class="usf-remove" @click="onClose"></div>

        <!-- Body content -->
        <div class="usf-preview__body">
            <!-- left - images of product -->
            <div class="usf-preview__content-left">
                <!-- Big image -->
                <div class="usf-preview__image-slider">
                    <div type="button" title="Prev" class="usf-preview__image-slider__btn usf-prev usf-icon usf-icon-up" @click="onPrevImage(0)" v-if="showBigImageNav"></div>

                    <div class="usf-preview__image-slider__track">
                        <div v-for="i in images" class="usf-preview__image-wrapper" :class="{'usf-active': image === i}"">
                            <div v-if="image === i" class="usf-preview__image lazyload" :data-bgset="usf.platform.getImageUrl(i.url,1024)" :style="'background-image:url('+usf.platform.getImageUrl(i.url, 1024)+')'"></div>
                            <span class="usf-img-loader"></span>
                        </div>
                    </div>

                    <div type="button" title="Next" class="usf-preview__image-slider__btn usf-next usf-icon usf-icon-up" @click="onNextImage(0)" v-if="showBigImageNav"></div>

                    <ul class="usf-preview__image-slider__dots" v-if="showImageIndices && false">
                        <li :class="{'active':i===image}" v-for="(i,index) in images"  @click="onThumbClick(i)"><button type="button">{{index+1}}</button></li>
                    </ul>
                </div>

                <!-- Thumbnails -->
                <div class="usf-preview__thumbs" v-if="showThumbs">
                    <div class="usf-preview__thumbs-inner">
                        <span v-for="i in images" class="usf-preview__thumb" :class="{'usf-active': image === i}" @click="onThumbClick(i)"></span>
                    </div>
                </div>

                <!-- Badges -->
                <div class="usf-preview__badge usf-preview__badge-sale" v-if="hasDiscount" v-html="loc.sale"></div>
            </div>

            <!-- right - info of the product -->
            <div class="usf-preview__content-right usf-scrollbar">
                <div class="usf-preview__content-summary">
                    <!-- Product title -->
                    <h1 class="usf-preview__title"><a :href="productUrl" v-html="product.title"></a></h1>

                    <!-- Vendor -->
                    <div class="usf-preview__vendor" v-html="product.vendor" v-if="usf.settings.search.showVendor"></div>

                    <!--Prices -->
                    <div class="usf-preview__price-wrapper" :class="{'price--sold-out': isSoldOut}">
                        <span class="usf-price" :class="{'usf-has-discount': hasDiscount}" v-html="usf.utils.getDisplayPrice(selectedVariant.compareAtPrice || selectedVariant.price)"></span>
                        <span v-if="hasDiscount" class="usf-discount" v-html="usf.utils.getDisplayPrice(selectedVariant.price)"></span>

                        <div v-if="false" class="price__badges price__badges--listing">
                            <span class="price__badge price__badge--sale" aria-hidden="true" v-if="hasDiscount && usf.settings.search.showSale">
                                <span v-html="loc.sale"></span>
                            </span>
                            <span class="price__badge price__badge--sold-out" v-if="isSoldOut && usf.settings.search.showSoldOut">
                                <span v-html="loc.soldOut"></span>
                            </span>
                        </div>
                    </div>

                    <!-- Description -->
                    <p class="usf-preview__description" :class="{'usf-with-loader':description===undefined}" v-html="description"></p>

                    <!-- Add to cart form -->
                    <form method="post" enctype="multipart/form-data" :action="usf.platform.addToCartUrl" @submit="_usfAddToCart">
                        <!-- variant ID -->
                        <input type="hidden" name="id" :value="selectedVariant.id" />

                        <!-- Options -->
                        <template v-for="(o,index) in product.options">
                            <usf-preview-modal-option :option="o" :index="index"></usf-preview-modal-option>
                        </template>

                        <!-- add to card button -->
                        <div class="usf-preview__field">                            
                            <div class="usf-flex usf-preview__add-to-cart">
                                <usf-num-input v-model="quantity" name="quantity" :disabled="!hasAvailableVariant" :min="1" :max="available" />
                                <button :title="!hasAvailableVariant ? loc.selectedVariantNotAvailable : ''" :disabled="!hasAvailableVariant" type="submit" name="add" class="usf-add-to-cart-btn" :class="{ 'usf-disabled': !hasAvailableVariant}">
                                    <span class="usf-label" v-html="loc.addToCart"></span>
                                </button>
                            </div>
                        </div>
                    </form>

                    <!-- See details link -->
                    <a class="usf-preview__link" :href="productUrl" v-html="loc.seeFullDetails"></a>
                </div>
            </div>
        </div>
    </div>
</div></div></div>`
/*inc_end_preview-modal*/,

    searchResultsBanner: /*inc_begin_search-banner*/        
`<div class="usf-sr-banner">
    <a :href="banner.url || 'javascript:void(0)'" :alt="banner.description">
        <img :src="banner.mediaUrl" style="max-width:100%">
    </a>
</div>
`
/*inc_end_search-banner*/,

    ////////////////////////
    // Filter templates
    // facet filters breadcrumb
    filtersBreadcrumb: /*inc_begin_filters-breadcrumb*/
`<div v-if="usf.settings.filterNavigation.showFilterArea && root.facetFilters && root.facets && facetFilterIds.length" class="usf-refineby">
    <!-- Breadcrumb Header -->
    <div class="usf-title usf-clear">
        <span class="usf-pull-left usf-icon usf-icon-equalizer"></span>
        <span class="usf-label" v-html="loc.filters"></span>

        <!-- Clear all -->
        <button class="usf-clear-all usf-btn" v-html="loc.clearAll" @click.prevent.stop="root.removeAllFacetFilters" :aria-label="loc.clearAllFilters"></button>
    </div>

    <!-- Breadcrumb Values -->
    <div class="usf-refineby__body">
        <template v-for="facetId in facetFilterIds" v-if="(facet = root.facets.find(fc => fc.id === facetId)) && (f = root.facetFilters[facetId])">
            <template v-for="queryValStr in f[1]">
                <div class="usf-refineby__item usf-pointer usf-clear" @click.prevent.stop="root.removeFacetFilter(facetId, queryValStr)">
                    <button class="usf-btn"><span class="usf-filter-label" v-html="facet.title + ': '"></span><b v-html="root.formatBreadcrumbLabel(facet, f[0], usf.utils.encodeHtml(queryValStr))"></b></button><span class="usf-remove"></span>
                </div>
            </template>
        </template>
    </div>
 </div>`
 /*inc_end_filters-breadcrumb*/,

    // facet filters    
    filters: /*inc_begin_filters*/
// Vert & Horz modes have different render order
`<div class="usf-facets usf-no-select usf-zone" :class="{'usf-facets--mobile':usf.isMobileFilter}">
<!-- Mobile view -->
<template v-if="usf.isMobile">
    <div class="usf-close" @click="onMobileBack(1)"></div>
    <div class="usf-facets-wrapper">
        <!-- Header. shows 'Filters', facet name, etc. -->
        <div class="usf-header">
            <!-- Single facet mode -->
            <template v-if="isSingleFacetMode">
                <div class="usf-title" @click="onMobileBack(0)" v-html="facets[0].title"></div>
                <div v-if="facetFilters" class="usf-clear" @click="removeAllFacetFilters" v-html="loc.clear"></div>
            </template>

            <!-- When a filter is selected -->
            <template v-else-if="mobileSelectedFacet">
                <div class="usf-title usf-back" @click="onMobileBack(0)" v-html="mobileSelectedFacet.title"></div>
                <div v-if="facetFilters && facetFilters[mobileSelectedFacet.id]" class="usf-clear" @click="removeFacetFilter(mobileSelectedFacet.id)" v-html="loc.clear"></div>
                <div v-else-if="mobileSelectedFacet.multiple" class="usf-all" @click="selectFacetFilter(mobileSelectedFacet)" v-html="loc.all"></div>
            </template>

            <!-- When no filter is selected -->
            <template v-else>
                <div class="usf-title" @click="onMobileBack(0)" v-html="loc.filters"></div>
                <div v-if="facetFilters" class="usf-clear" @click="removeAllFacetFilters" v-html="loc.clearAll"></div>
            </template>
        </div>

        <div class="usf-body">
            <!-- Desktop-like filter in mobile -->
            <template v-if="usf.settings.filters.desktopLikeMobile">
                <usf-filter-breadcrumb></usf-filter-breadcrumb>
                
                <!-- Facets body -->
                <div class="usf-facets__body">
                    <usf-filter :facet="f" :key="f.id" v-for="f in facets"></usf-filter>
                </div>
            </template>
            
            <!-- Mobile filter -->
            <template v-else>
                <!-- List all filter options, in single facet mode -->
                <usf-filter v-if="isSingleFacetMode" :facet="facets[0]"></usf-filter>

                <!-- List all filter options, when a filter is selected -->
                <usf-filter v-else-if="mobileSelectedFacet" :facet="mobileSelectedFacet"></usf-filter>

                <!-- List all when there are more than one facet -->
                <template v-else v-for="f in facets">
                    <template v-if="canShowFilter(f)">
                        <div :key="f.id" class="usf-facet-value" @click="onMobileSelectFacet(f)">
                            <span class="usf-title" v-html="f.title"></span>
                            <div v-if="(selectedFilterOptionValues = facetFilters && (ff = facetFilters[f.id]) ? ff[1] : null)" class="usf-dimmed">
                                <span v-for="cf in selectedFilterOptionValues" v-html="formatBreadcrumbLabel(f, f.facetName, cf)"></span>
                            </div>
                        </div>
                    </template>
                </template>
            </template>
        </div>

        <!-- View items -->
        <div class="usf-footer">
            <div @click="onMobileBack(1)" v-html="loc.viewItems"></div>
        </div>
    </div>
</template>

<!-- Desktop view -->
<template v-else>
    <usf-filter-breadcrumb></usf-filter-breadcrumb>
    <!-- Filters Loader -->
    <div v-if="!facets" class="usf-facets__first-loader">
        <template v-for="i in 3">
            <div class="usf-facet"><div class="usf-title usf-no-select"><span class="usf-label"></span></div>
                <div v-if="!usf.settings.filters.horz" class="usf-container"><div class="usf-facet-values usf-facet-values--List"><div class="usf-relative usf-facet-value usf-facet-value-single"><span class="usf-label"></span><span class="usf-value"></span></div><div class="usf-relative usf-facet-value usf-facet-value-single"><span class="usf-label"></span><span class="usf-value"></span></div></div></div>
            </div>
        </template>
    </div>
    <!-- Facets body -->
    <div v-else class="usf-facets__body">
        <usf-filter :facet="f" :key="f.id" v-for="f in facets"></usf-filter>
    </div>
</template>
</div>`
/*inc_end_filters*/,

    // facet filter item
    filter: /*inc_begin_filter*/
`<div v-if="canShow" class="usf-facet" :class="{'usf-collapsed': collapsed && !usf.isMobileFilter, 'usf-has-filter': isInBreadcrumb}">
    <!-- Mobile filter -->
    <div v-if="usf.isMobileFilter" class="usf-container">
        <!-- Search box -->
        <input v-if="hasSearchBox" class="usf-search-box" :aria-label="loc.filterOptions" :placeholder="loc.filterOptions" :value="term" @input="v => term = v.target.value">

        <!-- Values -->
        ` + _usfFilterBodyTemplate +
    `</div>

    <!-- Desktop filter -->
    <template v-else>
        <!-- Filter title -->
        <div class="usf-clear">
            <div class="usf-title usf-no-select" @click.prevent.stop="onExpandCollapse">
                <button class="usf-label usf-btn" v-html="facet.title" :aria-label="usf.utils.format(loc.filterBy,facet.title)" :aria-expanded="!collapsed"></button>
                <usf-helptip v-if="facet.tooltip" :tooltip="facet.tooltip"></usf-helptip>            
                <!-- 'Clear all' button to clear the current facet filter. -->
                <button v-if="isInBreadcrumb" class="usf-clear-all usf-btn" :title="loc.clearFilterOptions" :aria-label="usf.utils.format(loc.clearFiltersBy,facet.title)" @click.prevent.stop="onClear" v-html="loc.clear"></button>
                <span class="usf-pm"></span>
            </div>
        </div>

        <!-- Filter body -->
        <div class="usf-container">
            <!-- Search box -->
            <input v-if="hasSearchBox" class="usf-search-box" :placeholder="loc.filterOptions" :value="term" @input="v => term = v.target.value">

            ` + _usfFilterBodyTemplate +
        `
        </div>
    </template>
</div>`
/*inc_end_filter*/,

    // facet filter option
    filterOption: /*inc_begin_filter-option*/
`<div v-if="children" :class="(isSelected ? 'usf-selected ' : '') + ' usf-relative usf-facet-value usf-facet-value-single usf-with-children' + (collapsed ? ' usf-collapsed' : '')">
    <!-- option label -->
    <button class="usf-pm usf-btn" aria-label="Toggle children" v-if="children" @click.prevent.stop="onToggleChildren"></button>
    <button class="usf-label usf-btn" v-html="label" @click.prevent.stop="onToggle"></button>

    <!-- product count -->
    <span v-if="!(!usf.settings.filterNavigation.showProductCount || (swatchImage && !usf.isMobileFilter)) && option.value !== undefined" class="usf-value">{{option.value}}</span>    

    <div class="usf-children-container" v-if="children && !collapsed">
        <button :class="'usf-child-item usf-btn usf-facet-value' + (isChildSelected(c) ? ' usf-selected' : '')" v-for="c in children" v-html="getChildLabel(c)" @click="onChildClick(c)"></button>
    </div>
</div>
<button v-else :class="(isSelected ? 'usf-selected ' : '') + (swatchImage ? ' usf-facet-value--with-background' : '') + ' usf-btn usf-relative usf-facet-value usf-facet-value-' + (facet.multiple ? 'multiple' : 'single')" :title="isSwatch || isBox ? label + ' (' + option.value + ')' : undefined" :style="usf.isMobileFilter ? null : swatchStyle" @click.prevent.stop="onToggle">
    <!-- checkbox -->
    <div v-if="!isBox && !isSwatch && facet.multiple" :class="'usf-checkbox' + (isSelected ? ' usf-checked' : '')">
        <span class="usf-checkbox-inner"></span>
    </div>

    <!-- swatch image in mobile -->
    <div v-if="swatchImage && usf.isMobileFilter" class="usf-mobile-swatch" :style="swatchStyle"></div>

    <!-- option label -->
    <span class="usf-label usf-btn" v-html="label"></span>
    
    <!-- product count -->
    <span v-if="!(!usf.settings.filterNavigation.showProductCount || (swatchImage && !usf.isMobileFilter)) && option.value !== undefined" class="usf-value">{{option.value}}</span>
</button>`
/*inc_end_filter-option*/,

    // Instant search popup
    instantSearch: /*inc_begin_instantsearch*/
`<div :class="'usf-popup usf-zone usf-is usf-is--compact usf-is--' + position + (shouldShow ? '' : ' usf-hide') + (isEmpty ? ' usf-empty' : '') + (hasProductsOnly ? ' usf-is--products-only' : '') + (firstLoader ? ' usf-is--first-loader': '')"  :style="usf.isMobile ? null : {left: this.left + 'px',top: this.top + 'px',width: this.width + 'px'}">
    <!-- Mobile search box -->
    <div v-if="usf.isMobile">
        <form class="usf-is-inputbox" :action="searchUrl" method="get" role="search">
            <span class="usf-icon usf-icon-back usf-close" @click="usf.utils.hideInstantSearch"></span>
            <input name="q" autocomplete="off" ref="searchInput" :value="term" @input="onSearchBoxInput">
            <span class="usf-remove" v-if="term" @click="onClear"></span>
        </form>
    </div>

    <!-- First loader -->
    <div class="usf-is-first-loader" v-if="firstLoader">
        <div class="usf-clear">
            <div class="usf-img"></div>
            <div class="usf-title"></div>
            <div class="usf-subtitle"></div>
        </div>
        <div class="usf-clear">
            <div class="usf-img"></div>
            <div class="usf-title"></div>
            <div class="usf-subtitle"></div>
        </div>
        <div class="usf-clear">
            <div class="usf-img"></div>
            <div class="usf-title"></div>
            <div class="usf-subtitle"></div>
        </div>
    </div>

    <!-- All JS files loaded -->
    <template v-else>
        <!-- Empty view -->
        <div v-if="isEmpty" class="usf-is-no-results">
            <div style="background:url('//cdn.shopify.com/s/files/1/0257/0108/9360/t/85/assets/no-items.png?t=2') center no-repeat;min-height:160px"></div>
            <div v-html="usf.utils.format(loc.noMatchesFoundFor, usf.utils.encodeHtml(term))"></div>
        </div>
        <template v-else>
            <!-- Body content -->
            <div class="usf-is-content">
                <!-- Products -->
                <div class="usf-is-matches usf-is-products">
                    <div class="usf-title" v-html="queryOrTerm ? loc.productMatches : loc.trending"></div>
                    
                    <div class="usf-is-list" v-if="result.items.length">
                        <!-- Did you mean -->
                        <span class="usf-is-did-you-mean" v-html="usf.utils.format(loc.didYouMean, usf.utils.encodeHtml(term), result.query)" v-if="termDiffers"></span>

                        <!-- Product -->
                        <usf-is-item v-for="p in result.items" :product="p" :result="result" :key="p.id + '-' + p.selectedVariantId"></usf-is-item>
                    </div>
                    <div class="usf-is-list" v-else style="background:url('//cdn.shopify.com/s/files/1/0257/0108/9360/t/85/assets/no-products.png?t=2') center no-repeat;min-height:250px"></div>
                </div>

                <div class="usf-is-side">
                    <!-- Suggestions -->
                    <div class="usf-is-matches usf-is-suggestions" v-if="result.suggestions && result.suggestions.length">
                        <div class="usf-title" v-html="loc.searchSuggestions"></div>
                        <button v-for="s in result.suggestions" class="usf-is-match usf-btn" v-html="usf.utils.highlight(s, result.query)" @click="search(s)"></button>
                    </div>

                    <!-- Collections -->
                    <div class="usf-is-matches usf-is-collections" v-if="result.collections && result.collections.length">
                        <div class="usf-title" v-html="loc.collections"></div>
                        <button v-for="c in result.collections" class="usf-is-match usf-btn" v-html="usf.utils.highlight(c.title, result.query)" @click="selectCollection(c)"></button>
                    </div>

                    <!-- Pages -->
                    <div class="usf-is-matches usf-is-pages" v-if="result.pages && result.pages.length">
                        <div class="usf-title" v-html="loc.pages"></div>
                        <button v-for="p in result.pages" class="usf-is-match usf-btn" v-html="usf.utils.highlight(p.title, result.query)" @click="selectPage(p)"></button>
                    </div>
                </div>
            </div>

            <!-- Footer -->
            <div class="usf-is-viewall">
                <button class="usf-btn" @click="search(queryOrTerm)" v-html="usf.utils.format(queryOrTerm ? loc.viewAllResultsFor : loc.viewAllResults, usf.utils.encodeHtml(queryOrTerm))"></button>
            </div>
        </template>
    </template>
</div>`
/*inc_end_instantsearch*/
,

    // Instant search item
    instantSearchItem:/*inc_begin_instantsearch-item*/
`<div class="usf-is-product usf-clear" @click="onItemClick">
    <!-- Image -->
    <div class="usf-img-wrapper usf-pull-left">
        <img class="usf-img" :src="selectedImageUrl" :alt="selectedImage.alt">
    </div>
    
    <div class="usf-pull-left">
        <!-- Title -->
        <button class="usf-title usf-btn" v-html="usf.utils.highlight(product.title, result.query)"></button>

        <!-- Vendor -->
        <div class="usf-vendor" v-html="product.vendor" v-if="usf.settings.search.showVendor"></div>

        <!-- Prices -->
        <div class="usf-price-wrapper">
            <span class="usf-price" :class="{ 'usf-has-discount': hasDiscount }" v-html="displayPrice"></span>
            <span v-if="hasDiscount" class="usf-discount" v-html="displayDiscountedPrice"></span>
        </div>
    </div>
</div>`
/*inc_end_instantsearch-item*/,
tooltipTemplate: `  
<div v-if="type == 'add-to-cart'" class="usf-tt-add-to-cart">
    <product-form v-if="hasOnlyDefaultVariant" class="m-product-form" :data-product-id="product.id" ref="product-form">
        <form method="post" :action="usf.platform.addToCartUrl" accept-charset="UTF-8" class="product-card-form" enctype="multipart/form-data" :data-product-id="product.id" novalidate="novalidate">
            <input type="hidden" name="form_type" value="product">
            <input type="hidden" name="utf8" value="✓">
            <input type="hidden" name="id" :value="selectedVariantForPrice.id" :data-selected-variant="selectedVariantForPrice.id">
            <button class="m-tooltip m-spinner-button m-button--icon" :class="[className,classType,'m-tooltip--style-' + ttStyle]" :data-product-handle="product.urlName" name="add">
                <span class="m-spinner-icon">
                    <svg class="animate-spin m-svg-icon--medium" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                        <path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                </span>
                <span>
                    <svg class="m-svg-icon--medium" fill="currentColor" stroke="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                        <path d="M352 128C352 57.42 294.579 0 224 0 153.42 0 96 57.42 96 128H0v304c0 44.183 35.817 80 80 80h288c44.183 0 80-35.817 80-80V128h-96zM224 48c44.112 0 80 35.888 80 80H144c0-44.112 35.888-80 80-80zm176 384c0 17.645-14.355 32-32 32H80c-17.645 0-32-14.355-32-32V176h48v40c0 13.255 10.745 24 24 24s24-10.745 24-24v-40h160v40c0 13.255 10.745 24 24 24s24-10.745 24-24v-40h48v256z" />
                    </svg>
                </span>

                <span class="m-tooltip__content" :class="[contentClass]" data-atc-text :data-revert-text="revertText" v-html="content"></span>
            </button>
        </form>
    </product-form>
    <button v-else class="m-tooltip m-button--icon" :class="[className,classType,'m-tooltip--style-' + ttStyle]" :data-product-handle="product.urlName">
        <template v-if="_usfGlobalSettings.select_option_button_action == 'popup'">
            <span class="m-spinner-icon">
                <svg class="animate-spin m-svg-icon--medium" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
            </span>
            <span class="m-tooltip-icon quick-add" :data-product-handle="product.urlName">
                <svg class="m-svg-icon--medium" fill="currentColor" stroke="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                    <path d="M352 128C352 57.42 294.579 0 224 0 153.42 0 96 57.42 96 128H0v304c0 44.183 35.817 80 80 80h288c44.183 0 80-35.817 80-80V128h-96zM224 48c44.112 0 80 35.888 80 80H144c0-44.112 35.888-80 80-80zm176 384c0 17.645-14.355 32-32 32H80c-17.645 0-32-14.355-32-32V176h48v40c0 13.255 10.745 24 24 24s24-10.745 24-24v-40h160v40c0 13.255 10.745 24 24 24s24-10.745 24-24v-40h48v256z" />
                </svg>
            </span>
        </template>
        <a v-else class="m-tooltip-icon" :href="productUrl" :aria-label="content">
            <svg class="m-svg-icon--medium" fill="currentColor" stroke="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                <path d="M352 128C352 57.42 294.579 0 224 0 153.42 0 96 57.42 96 128H0v304c0 44.183 35.817 80 80 80h288c44.183 0 80-35.817 80-80V128h-96zM224 48c44.112 0 80 35.888 80 80H144c0-44.112 35.888-80 80-80zm176 384c0 17.645-14.355 32-32 32H80c-17.645 0-32-14.355-32-32V176h48v40c0 13.255 10.745 24 24 24s24-10.745 24-24v-40h160v40c0 13.255 10.745 24 24 24s24-10.745 24-24v-40h48v256z" />
            </svg>
        </a>
        <span class="m-tooltip__content" :class="[contentClass]" data-atc-text :data-revert-text="revertText" v-html="content"></span>
    </button>
</div>
<button v-else class="m-tooltip m-button--icon" :class="[className,classType,'m-tooltip--style-' + ttStyle]" type="button" :data-product-handle="product.urlName">
    <span v-if="type == 'quickview'" class="m-spinner-icon">
        <svg class="animate-spin m-svg-icon--medium" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
    </span>
    <span class="m-tooltip-icon m:block" v-html="iconName"></span>
    <span class="m-tooltip__content" :class="[contentClass]" data-atc-text :data-revert-text="revertText" v-html="content"></span>
</button>`,
  quickAddBtn: `<div v-if="_usfGlobalSettings.show_cart_button" class="m-product-card__action-wrapper">
  <product-form v-if="hasOnlyDefaultVariant" class="m-product-form m:w-full" :data-product-id="product.id">
      <form method="post" :action="usf.platform.addToCartUrl" accept-charset="UTF-8" class="product-card-form" enctype="multipart/form-data" novalidate="novalidate" :data-product-id="product.id">
          <input type="hidden" name="form_type" value="product">
          <input type="hidden" name="utf8" value="✓">
          <input hidden name="id" required :value="selectedVariantForPrice.id" :data-selected-variant="selectedVariantForPrice.id">

          <button :class="'m-add-to-cart m-spinner-button m:w-full m-button m-button--' + buttonStyle" name="add" :disabled="isSoldOut" :aria-label="loc.addToCart">
              <span class="m-spinner-icon">
                  <svg class="animate-spin m-svg-icon--medium" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                      <path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
              </span>
              <span class="m-add-to-cart--text" data-atc-text v-html="isSoldOut ? loc.soldOut : loc.addToCart"></span>
          </button>
      </form>
  </product-form>
  <template v-else>
      <template v-if="_usfGlobalSettings.select_option_button_action == 'popup'">
          <input hidden name="id" required :value="selectedVariantForPrice.id" :data-selected-variant="selectedVariantForPrice.id">
          <button :class="'m-product-form m:w-full m-product-quickview-button m-spinner-button m-button m-button--' + buttonStyle" :data-product-url="productUrl" :data-product-id="product.id" :data-product-handle="product.urlName">
              <span class="m-spinner-icon">
                  <svg class="animate-spin m-svg-icon--medium" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                      <path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
              </span>
              <span v-html="_usfQuickAddTxt"></span>
          </button>
      </template>
      <template v-else>
          <input hidden name="id" required :value="selectedVariantForPrice.id" :data-selected-variant="selectedVariantForPrice.id">
          <a  :class="'m-product-form m:w-full m-button m-button--' + buttonStyle" :href="productUrl" :data-product-id="product.id">
              <span v-html="loc.chooseOptions"></span>
          </a>
      </template>
  </template>
</div>`,
swatchTemplate: `<div data-limit data-pcard-variant-picker :data-product-handle="product.urlName" ref="pcard-swatch">
<pcard-swatch class="m-product-option m:flex-wrap m:items-center" :class="['m-product-option--' + _usfGlobalSettings.pcard_option_design,'m:justify-' + alignment]">

    <swatch-dropdown v-if="_usfGlobalSettings.pcard_option_design == 'dropdown'" class="m-product-option--content m:inline-flex m:flex-wrap">
        <label :for="option.name + ' ' + optionIndex"></label>
        <select class="m-product-option--dropdown-select">
            <option v-for="(o,index) in optionWithValues" :selected="o.value == selectedOptionValue" class="m-product-option--node__label" :data-option-position="optionIndex+1" data-option-type="dropdown" :data-value="o.value" v-html="o.value"></option>
        </select>
    </swatch-dropdown>
    <swatch-image v-else-if="_usfGlobalSettings.pcard_option_design == 'image'" class="m-product-option--content m:inline-flex m:flex-wrap">
        <label v-for="(o,index) in optionWithValues" v-if="index < valuesLimit" :data-selected="o.value == selectedOptionValue" class="m-product-option--node__label" :data-option-position="optionIndex+1" data-option-type="image" :data-value="o.value" :style="'--option-aspect-ratio:' + _usfGetImageRatio(selectedImage)" v-html="o.value"></label>
        <div v-if="restValues && restValues > 0" class="m-product-option--node__label m-product-option--more-option m-product-quickview-button m-spinner-button" :data-product-handle="product.urlName">
            <span class="m-spinner-icon">
                <svg class="animate-spin m-svg-icon--medium" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
            </span>
            <div class="m-tooltip m-tooltip--style-2 m-tooltip--top">
                <span class="text-base">+{{ restValues }}</span>
                <span class="m-tooltip__content" v-html="_usf_see_more_options.replace('{{ count }}',restValues)"></span>
            </div>
        </div>
    </swatch-image>
    <swatch-color v-else-if="_usfGlobalSettings.pcard_option_design == 'color'" class="m-product-option--content m:inline-flex m:flex-wrap">
        <div v-for="(o,index) in optionWithValues" v-if="index < valuesLimit" class="m-product-option--node m-tooltip m-tooltip--top">
            <div class="m-product-option--swatch">
                <label  :data-selected="o.value == selectedOptionValue" class="m-product-option--node__label" :data-option-position="optionIndex+1" data-option-type="color" :data-value="o.value" v-html="o.value"></label>
            </div>
            <span class="m-tooltip__content" v-html="o.value">{</span>
        </div>
        <div v-if="restValues && restValues > 0" class="m-product-option--more-option m-product-quickview-button m-spinner-button" :data-product-handle="product.urlName">
            <span class="m-spinner-icon">
                <svg class="animate-spin m-svg-icon--medium" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
            </span>
            <div class="m-tooltip m-tooltip--style-2 m-tooltip--top">
                <span class="text-base">+{{ restValues }}</span>
                <span class="m-tooltip__content" v-html="_usf_see_more_options.replace('{{ count }}',restValues)"></span>
            </div>
        </div>
    </swatch-color>
    <swatch-button v-else-if="_usfGlobalSettings.pcard_option_design == 'button'" class="m-product-option--content m:inline-flex m:flex-wrap">
        <label v-for="(o,index) in optionWithValues" v-if="index < valuesLimit"  :data-selected="o.value == selectedOptionValue" class="m-product-option--node__label" :data-option-position="optionIndex+1" data-option-type="button" :data-value="o.value" v-html="o.value"></label>
        <div v-if="restValues && restValues > 0" class="m-product-option--node__label m-product-option--more-option m-product-quickview-button m-spinner-button" :data-product-handle="product.urlName">
            <span class="m-spinner-icon">
                <svg class="animate-spin m-svg-icon--medium" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
            </span>
            <div class="m-tooltip m-tooltip--style-2 m-tooltip--top">
                <span class="text-base">+{{ restValues }}</span>
                <span class="m-tooltip__content" v-html="_usf_see_more_options.replace('{{ count }}',restValues)"></span>
            </div>
        </div>
    </swatch-button>
    <swatch-color v-else class="m-product-option--content m:inline-flex m:flex-wrap">
        <div v-for="(o,index) in optionWithValues" v-if="index < valuesLimit" class="m-product-option--swatch">
            <label :data-selected="o.value == selectedOptionValue" class="m-product-option--node__label" :data-option-position="optionIndex+1" data-option-type="color" :data-value="o.value" v-html="o.value"></label>
        </div>
        <div v-if="restValues && restValues > 0" class="m-product-option--node__label m-product-option--more-option m-product-quickview-button m-spinner-button" :data-product-handle="product.urlName">
            <span class="m-spinner-icon">
                <svg class="animate-spin m-svg-icon--medium" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
            </span>
            <div class="m-tooltip m-tooltip--style-2 m-tooltip--top">
                <span class="text-base">+{{ restValues }}</span>
                <span class="m-tooltip__content" v-html="_usf_see_more_options.replace('{{ count }}',restValues)"></span>
            </div>
        </div>
    </swatch-color>
</pcard-swatch>
<div v-html="_dataProduct(product)"></div>
</div>`
};

usf.event.add('init', function () {    
    window._usfActive = 1;
	// register or override components
    // ...    
    /*var SearchResultsGridItem2 = {
        template: usf.templates.searchResultsGridViewItem,
    }
    usf.register(SearchResultsGridItem2, usf.components.SearchResultsGridItem, "usf-sr-griditem");*/
    _usfImageWidths = _usfIsDynamicImage ? [200, 400, 600, 700, 800, 900, 1000, 1200] : [usf.settings.search.imageSize];
    _usfSetDefaultSettings();
    var NewSearchResults = {
        mixins: [usf.components.SearchResults],
        template: usf.templates.searchResults,
        data(){
            return {
                layout: parseInt(_usf_initial_column),
            }
        },
        mounted() {
            this.$nextTick(function() {
                usf.event.add('mobile_changed', ()=> {
                    if(usf.isMobile && this.layout > 2){
                        this.layout = 2
                    }else{
                        this.layout = parseInt(_usf_initial_column)
                    }
                });
              
    
            })
        },
        created(){ 
            if(usf.isMobile && this.layout > 2){
                this.layout = 2
            };

        }, 
        methods:{
            onNewGridViewClick(col){
                this.layout = col;
                this.onGridViewClick();
            },
        },
        computed:{
            gridWrapClass(){
                
                return 'm-collection-products m:flex m:flex-wrap m-cols-' + this.layout
            },
        }
    }
    usf.register(NewSearchResults, null, "usf-new-sr");


    // Inheritted component for grid view
    var NewSearchResultsItemBase = {
        mixins: [usf.components.SearchResultsGridItem],
        template: usf.templates.searchResultsGridViewItem,
        props:{
            pIndex: Number
        },
        data(){
            var tag_type,tag_name;
            var tagBadges = [];
            if(_usfGlobalSettings.show_badge_sale){
                for(let i = 0; i < this.product.tags.length;i++){
                    var tag  = this.product.tags[i];
                    if(tag.includes('tag__')){
                        var color_scheme_class = 'm-gradient m-color-';
                        var color_schema_style = ''
                        var tag_content = tag.split('__').pop();
                        var tag_type =  tag_content.split('_').shift();
                        var tag_name = tag_content.split('_').pop();
                        switch(tag_type){
                            case 'sale':
                                color_scheme_class = color_scheme_class + _usfGlobalSettings.sale_badge_color_scheme;
                                color_schema_style = _usfGlobalSettings.sale_badge_color_scheme;;
                                break;
                            case 'new':
                                color_scheme_class = color_scheme_class + _usfGlobalSettings.new_badge_color_scheme;
                                color_schema_style = _usfGlobalSettings.new_badge_color_scheme;;
                                break;
                            case 'hot':
                                color_scheme_class = color_scheme_class + _usfGlobalSettings.hot_badge_color_scheme;
                                color_schema_style = _usfGlobalSettings.hot_badge_color_scheme;;
                                break;
                            
                        };
                        tagBadges.push({
                            type: tag_type,
                            color_scheme_class: color_scheme_class,
                            tag_name: tag_name,
                            color_schema_style: color_schema_style
                        })
                        
                    }
                }
            }
            return {
                tagBadges: tagBadges,
                priceHtml: '',
                priceLoader: true,
                hasOnlyDefaultVariant: _usfProductHasOnlyDefaultVariant(this.product),
            }
        },
        created(){ 
            var t = this;
            fetch(`/products/` + t.product.urlName + '?view=usf-price&variant=' + this.selectedVariantForPrice.id, {
                credentials: 'same-origin',
                method: 'GET'
            }).then(function (response) {
                return response.text() 
            }).then(rs => { 
                t.priceHtml = rs;
                t.priceLoader = false;
            });  
            if(usf.isMobile && this.layout > 2){
                this.layout = 2
            };
        }, 
        computed:{
            imageRatio(){
                var ratio = _usfGlobalSettings.pcard_default_image;
                if(!ratio || ratio == '' || ratio == 'original'){
                    ratio = _usfGetImageRatio(this.selectedImage)
                }
                return ratio
            }
        }
    }

    var SearchResultsGridItem1 = {
        mixins: [NewSearchResultsItemBase],
        template: usf.templates.searchResultsGridViewItem,
    }
    usf.register(SearchResultsGridItem1, null, "usf-sr-griditem1");

    var SearchResultsGridItem2 = {
        mixins: [NewSearchResultsItemBase],
        template: usf.templates.searchResultsGridViewItem2,
    }
    usf.register(SearchResultsGridItem2, null, "usf-sr-griditem2");

    var SearchResultsGridItem3 = {
        mixins: [NewSearchResultsItemBase],
        template: usf.templates.searchResultsGridViewItem3,
    }
    usf.register(SearchResultsGridItem3, null, "usf-sr-griditem3");

    var SearchResultsGridItem4 = {
        mixins: [NewSearchResultsItemBase],
        template: usf.templates.searchResultsGridViewItem4,
    }
    usf.register(SearchResultsGridItem4, null, "usf-sr-griditem4");

    var SearchResultsGridItem5 = {
        mixins: [NewSearchResultsItemBase],
        template: usf.templates.searchResultsGridViewItem5,
    }
    usf.register(SearchResultsGridItem5, null, "usf-sr-griditem5");

    var QuickAddBtn = {
        props:{
            product: Object,
            btnStyle: String,
            hasOnlyDefaultVariant: Boolean,
            isSoldOut: Boolean,
            selectedVariantForPrice: Object,
            loc: Object,
            productUrl: String
        },
        data(){
            return {
                buttonStyle: this.btnStyle ? this.btnStyle.replace('sf__btn-primary','m-button--primary').replace('sf__btn-secondary', 'm-button--secondary').replace('sf__btn-link', 'm-button--link').replace('sf__btn-white', 'm-button--white') : 'secondary',
            }
        },
        template: usf.templates.quickAddBtn
       
    }
    usf.register(QuickAddBtn, null, "usf-quick-add-btn");


    
    /**
     * snippets/tooltip.liquid
     */
    var UsfTooltip = {
        props: {
            className: {
                default: 'm-tooltip--left',
                type: String
            },
            ttStyle: {
                default: 1,
                type: Number
            },
            type: String,
            product: Object,
            loc: Object,
            isSoldOut: Boolean,
            productUrl: String,
            hasOnlyDefaultVariant: Boolean,
            selectedVariantForPrice: Object
        },
        data(){
            var icon_name = '';
            var content = '';
            var revert_text = '';
            var classType = '';
            var content_class = '';
            switch(this.type){
                case 'wishlist':
                    icon_name = '<svg class="m-svg-icon--medium" viewBox="0 0 15 13" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13.1929 1.1123C13.8492 1.67741 14.2867 2.35189 14.5054 3.13574C14.7242 3.90137 14.7333 4.63965 14.5328 5.35059C14.3323 6.06152 13.9859 6.6722 13.4937 7.18262L8.70857 12.0498C8.4169 12.3415 8.07055 12.4873 7.66951 12.4873C7.26846 12.4873 6.92211 12.3415 6.63044 12.0498L1.84529 7.18262C1.3531 6.6722 1.00675 6.06152 0.806225 5.35059C0.605704 4.62142 0.614819 3.87402 0.833569 3.1084C1.05232 2.34277 1.48982 1.67741 2.14607 1.1123C2.92992 0.456055 3.8505 0.173503 4.90779 0.264648C5.98331 0.337565 6.90388 0.756836 7.66951 1.52246C8.43513 0.756836 9.34659 0.337565 10.4039 0.264648C11.4794 0.173503 12.4091 0.456055 13.1929 1.1123ZM12.564 6.25293C13.0927 5.70605 13.357 5.04069 13.357 4.25684C13.357 3.45475 13.0289 2.74382 12.3726 2.12402C11.8258 1.68652 11.1877 1.49512 10.4586 1.5498C9.74763 1.60449 9.13695 1.89616 8.62654 2.4248L7.66951 3.38184L6.71248 2.4248C6.20206 1.89616 5.58227 1.60449 4.8531 1.5498C4.14216 1.49512 3.51326 1.68652 2.96638 2.12402C2.31013 2.74382 1.98201 3.45475 1.98201 4.25684C1.98201 5.04069 2.24633 5.70605 2.77498 6.25293L7.58748 11.1201C7.64216 11.193 7.69685 11.193 7.75154 11.1201L12.564 6.25293Z" fill="currentColor"/></svg>'
                    content = _usfAddToWishlistText;
                    revert_text = _usfRemoveFromWishlistText;
                    classType = 'm-wishlist-button';
                    content_class = 'm-wishlist-button-text';
                    break;
                case 'quickview':
                    icon_name = '<svg class="m-svg-icon--medium" viewBox="0 0 17 11" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8.64216 2.3623C9.49893 2.3623 10.219 2.66309 10.8023 3.26465C11.4039 3.84798 11.7047 4.56803 11.7047 5.4248C11.7047 6.26335 11.4039 6.9834 10.8023 7.58496C10.219 8.16829 9.49893 8.45996 8.64216 8.45996C7.80362 8.45996 7.08357 8.16829 6.48201 7.58496C5.89867 6.9834 5.60701 6.26335 5.60701 5.4248C5.60701 5.13314 5.64346 4.85059 5.71638 4.57715C5.95336 4.70475 6.19945 4.76855 6.45466 4.76855C6.87393 4.76855 7.2294 4.62272 7.52107 4.33105C7.83096 4.02116 7.98591 3.65658 7.98591 3.2373C7.98591 2.9821 7.92211 2.736 7.79451 2.49902C8.06794 2.40788 8.3505 2.3623 8.64216 2.3623ZM16.4351 5.01465C16.4898 5.14225 16.5172 5.27897 16.5172 5.4248C16.5172 5.57064 16.4898 5.70736 16.4351 5.83496C15.6695 7.29329 14.594 8.46908 13.2086 9.3623C11.8232 10.2373 10.301 10.6748 8.64216 10.6748C7.54841 10.6748 6.49112 10.4743 5.47029 10.0732C4.46768 9.65397 3.57445 9.08887 2.7906 8.37793C2.00675 7.64876 1.35961 6.80111 0.849194 5.83496C0.794507 5.70736 0.767163 5.57064 0.767163 5.4248C0.767163 5.27897 0.794507 5.14225 0.849194 5.01465C1.61482 3.55632 2.69034 2.38965 4.07576 1.51465C5.46117 0.621419 6.98331 0.174805 8.64216 0.174805C10.301 0.174805 11.8232 0.621419 13.2086 1.51465C14.594 2.38965 15.6695 3.55632 16.4351 5.01465ZM8.64216 9.3623C9.99112 9.3623 11.2398 9.01595 12.3883 8.32324C13.5549 7.6123 14.4755 6.64616 15.15 5.4248C14.4755 4.20345 13.5549 3.24642 12.3883 2.55371C11.2398 1.84277 9.99112 1.4873 8.64216 1.4873C7.2932 1.4873 6.03539 1.84277 4.86873 2.55371C3.72029 3.24642 2.80883 4.20345 2.13435 5.4248C2.57185 6.22689 3.12784 6.92871 3.80232 7.53027C4.4768 8.11361 5.22419 8.56934 6.04451 8.89746C6.88305 9.20736 7.74893 9.3623 8.64216 9.3623Z" fill="currentColor"/></svg>'
                    content = this.loc.quickView;
                    classType = 'm-product-quickview-button m-spinner-button';
                    break;
                case 'compare':
                    icon_name = '<svg class="m-svg-icon--medium" viewBox="0 0 15 13" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14.4508 10.3623L12.2906 12.3584C12.0719 12.5589 11.8258 12.6045 11.5523 12.4951C11.2789 12.3857 11.1422 12.1852 11.1422 11.8936V10.7998H10.2945C10.2034 10.7998 10.1213 10.7633 10.0484 10.6904L7.58748 8.03809L8.62654 6.91699L10.814 9.26855H11.1422V7.95605C11.1422 7.66439 11.2789 7.46387 11.5523 7.35449C11.8258 7.22689 12.0719 7.27246 12.2906 7.49121L14.4508 9.43262C14.5784 9.56022 14.6422 9.71517 14.6422 9.89746C14.6422 10.0798 14.5784 10.2347 14.4508 10.3623ZM0.970288 3.58105C0.879142 3.58105 0.797111 3.55371 0.724194 3.49902C0.669507 3.42611 0.642163 3.34408 0.642163 3.25293V2.37793C0.642163 2.28678 0.669507 2.21387 0.724194 2.15918C0.797111 2.08626 0.879142 2.0498 0.970288 2.0498H4.00544C4.09659 2.0498 4.17862 2.08626 4.25154 2.15918L6.71248 4.81152L5.67341 5.93262L3.48591 3.58105H0.970288ZM14.4508 2.43262C14.5784 2.56022 14.6422 2.71517 14.6422 2.89746C14.6422 3.07975 14.5784 3.2347 14.4508 3.3623L12.2906 5.3584C12.0719 5.55892 11.8258 5.60449 11.5523 5.49512C11.2789 5.38574 11.1422 5.18522 11.1422 4.89355V3.58105H10.814L4.25154 10.6904C4.17862 10.7633 4.09659 10.7998 4.00544 10.7998H0.970288C0.751538 10.7998 0.642163 10.6904 0.642163 10.4717V9.59668C0.642163 9.37793 0.751538 9.26855 0.970288 9.26855H3.48591L10.0484 2.15918C10.1213 2.08626 10.2034 2.0498 10.2945 2.0498H11.1422V0.956055C11.1422 0.664388 11.2789 0.463867 11.5523 0.354492C11.8258 0.245117 12.0719 0.29069 12.2906 0.491211L14.4508 2.43262Z" fill="currentColor"/></svg>'
                    content = window._usfAddToCompare;
                    revert_text = window._usfRemoveToCompare;
                    classType = 'm-compare-button';
                    content_class = 'm-compare-button-text';
                    break;
                case 'remove-from-compare':
                    icon_name = '<svg class="m-svg-icon--medium" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>'
                    content = window._usfRemoveToCompare;
                    classType = 'm-compare-remove-button'
                    break;
                case 'zoom-in':
                    icon_name = '<svg class="m-svg-icon--medium" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor" stroke="currentColor"><path d="M319.8 204v8c0 6.6-5.4 12-12 12h-84v84c0 6.6-5.4 12-12 12h-8c-6.6 0-12-5.4-12-12v-84h-84c-6.6 0-12-5.4-12-12v-8c0-6.6 5.4-12 12-12h84v-84c0-6.6 5.4-12 12-12h8c6.6 0 12 5.4 12 12v84h84c6.6 0 12 5.4 12 12zm188.5 293L497 508.3c-4.7 4.7-12.3 4.7-17 0l-129-129c-2.3-2.3-3.5-5.3-3.5-8.5v-8.5C310.6 395.7 261.7 416 208 416 93.8 416 1.5 324.9 0 210.7-1.5 93.7 93.7-1.5 210.7 0 324.9 1.5 416 93.8 416 208c0 53.7-20.3 102.6-53.7 139.5h8.5c3.2 0 6.2 1.3 8.5 3.5l129 129c4.7 4.7 4.7 12.3 0 17zM384 208c0-97.3-78.7-176-176-176S32 110.7 32 208s78.7 176 176 176 176-78.7 176-176z"/></svg>'
                    content = window._usfZoominText;
                    classType = 'm-product-media__zoom-in';
                    break;
                case 'add-to-cart':
                    var atc_text = this.loc.chooseOptions;
                    if(this.hasOnlyDefaultVariant){
                        atc_text = this.loc.addToCart;
                        classType = 'm-add-to-cart';

                    }else if(_usfGlobalSettings.select_option_button_action == 'popup'){
                        classType = 'm-product-quickview-button m-spinner-button';
                    }
                    if(this.isSoldOut){
                        classType += ' disabled';
                    }
                    content = atc_text;
                    break;
                default:
                    icon_name = 'star';
                    content = window._usfRemoveToCompare;
                    classType = 'hidden';
                    content_class = 'hidden';
                    break;

            }

            return{
                iconName: icon_name,
                content: content,
                revertText: revert_text,
                classType: classType,
                contentClass:content_class
            }
        },
        methods:{
        },
        template: usf.templates.tooltipTemplate,
    }
    usf.register(UsfTooltip, null, "usf-tooltip");


    /**
    * custom filter
    * */
    var _usfWindowWidth = 1280;
    var _usfFilterSelector = '.m-filter--wrapper'
    var NewFilter = {
        mixins: [usf.components.Filters],
        template: usf.templates.filters,
        methods: {
            moveFilter() {
                var el = this.$el;
                if (!usf.settings.filters.horz && !usf.isMobile && window.innerWidth >= _usfWindowWidth) {
                    var drawerZone = document.querySelector(_usfFilterSelector)
                    if (drawerZone) {
                        drawerZone.innerHTML = '';
                        drawerZone.appendChild(el);
                        document.body.classList.add('usf-has-filter-drawer');
                    }
                }else{
                    window.usf_container.prepend(el);
                    document.body.classList.remove('usf-has-filter-drawer');
                }
                
            }
        },
        mounted() {
            this.$nextTick(function() {
                usf.event.add('mobile_changed', this.moveFilter);
                if (!usf.settings.filters.horz && !usf.isMobile && window.innerWidth >= _usfWindowWidth) {
                    this.moveFilter();
                }
                var t = this;
                window.addEventListener("resize", function(){
                    if((document.body.classList.contains('usf-has-filter-drawer') && window.innerWidth < _usfWindowWidth) || !document.body.classList.contains('usf-has-filter-drawer') && window.innerWidth >= _usfWindowWidth)
                            t.moveFilter();
                });

            })
        },
    }
    usf.register(NewFilter, null, 'new-filters');


     /**
    * color swatch component
    * */
     var UsfSwatches = {
		props: {
			product: Object,
            selectedImage: Object
		},
		data() {
			var product = this.product;
			var option, optionHandle;
			var optionIndex = 0;
			var optionWithValues = [];
			var optionRendereds = {};
			var selectedOptionValue = '';
			for (let i = 0; i < product.options.length; i++) {
				var o = product.options[i];
				var o_name = _usfHandlezie(o.name);
                var downcased_option = o.name.toLowerCase();
				if (_usfGlobalSettings.pcard_option_name && downcased_option == _usfGlobalSettings.pcard_option_name.toLowerCase()) {
					optionHandle = o_name;
					optionIndex = i;
					option = o;
					break;
				}
			}
			if (option) {
				selectedOptionValue = this.$parent.selectedVariantForPrice.options[optionIndex] != undefined ? option.values[this.$parent.selectedVariantForPrice.options[optionIndex]] : '';
				option.values.filter(o => {
					for (let x = 0; x < product.variants.length; x++) {
						var v = product.variants[x];
						if (v.options[optionIndex] != undefined) {
							var vrOpt = option.values[v.options[optionIndex]];
							if (o === vrOpt && !optionRendereds[o]) {
								optionRendereds[o] = 1;
								optionWithValues.push({
									value: o,
									image: product.images[v.imageIndex],
									variant: v
								});
                                break;
							}
						}
					}
				})
			}

            var alignment;
            switch(_usfGlobalSettings.pcard_alignment){
                case 'left':
                    alignment = 'start'
                    break;
                case 'right':
                    alignment = 'end'
                    break;
                default:
                    alignment = 'center'
                    break;
            };
            var valuesLimit = _usfGlobalSettings.pcard_limit_values_number ? _usfGlobalSettings.pcard_limit_values_number: 99;
            var restValues = optionWithValues.length >  valuesLimit ? optionWithValues.length = valuesLimit : 0;
			return {
				option: option,
				optionHandle: optionHandle,
				optionIndex: optionIndex,
				selectedOptionValue: selectedOptionValue,
				optionWithValues: optionWithValues,
                alignment: alignment,
                valuesLimit: valuesLimit,
                restValues: restValues
			}
		},
        mounted() {
            this.$nextTick(function() {

                //for customElements
                if(this.$refs['pcard-swatch']){
                    var temp = this.$refs['pcard-swatch'].innerHTML;
                    this.$refs['pcard-swatch'].innerHTML = '';
                    this.$refs['pcard-swatch'].innerHTML = temp;
                }

            })
        },
		template: usf.templates.swatchTemplate
	}
	usf.register(UsfSwatches, null, 'usf-swatches');

    
    /**
     * Inventory component
     * */
    var UsfInventory = {
        props: {
            product: Object,
            selectedVariant: Object,
        },
        data() {
            var p = this.product;
            var inventory_threshold = _usfGlobalSettings.low_inventory_threshold;
            var show_inventory_count = _usfGlobalSettings.show_inventory_count;
            var inventory_visibility = _usfGlobalSettings.inventory_visibility;
            var inventory_hide_backordered = _usfGlobalSettings.inventory_hide_backordered;
            var total = 0;
            var inventory_policy = '';
            var status = '';
            var productSoldOut = true;
            var noInventoryManagement = false;
            for(let i = 0;i < p.variants.length;i++){
                var variant = p.variants[i];
                if(variant.available > 0){
                    total+= variant.available;
                };
                var continueSelling = variant.flags & 1;
                if(continueSelling){
                    inventory_policy = 'continue';
                };
                if(variant.available === -2147483648){
                    noInventoryManagement = true;
                };
                if(productSoldOut){
                    if(!usf.utils.isVariantSoldOut(variant)){
                        productSoldOut = false;
                    }
                }
               
            }
            if(total<=0){
                if(inventory_policy == 'continue'){
                    status = 'backordered';
                }else if(!productSoldOut){
                    status = 'in_stock';
                }else{
                    status = 'outofstock';
                };
            }else if(total <= inventory_threshold){
                status = 'low'
            }else{
                status = 'normal';
            };
            var show = false;
            if(inventory_visibility == 'always'){
                show = true;
                if(status == 'backordered' && inventory_hide_backordered){
                    show = false;
                }
            }else{
                if(status == 'low'){
                    show = true
                }
            };
            if(status == 'outofstock'){
                show = false
            };
            var hidden = false;
            if(show_inventory_count == 'never' || show_inventory_count == 'low_inventory' && status != 'low' && total <= 0){
                hidden = true;
            }
            if(noInventoryManagement){
                show = false;
            }
            return {
                status: status,
                show:show,
                hidden: hidden,
                total: total
            }
        },
  
        template: `<div v-if="show" class="m-product-inventory m-product-card__inventory" :data-status="status">
        <div class="m-product-inventory__inner">
          <span class="m-product-inventory__text">
            <span v-if="status == 'backordered'" class="m-product-inventory__status">Backordered</span>
            <span v-else-if="status == 'low'" class="m-product-inventory__status">Low stock</span>
            <span v-else class="m-product-inventory__status" v-html="_usfInStockText"></span>
            <span class="m-product-inventory__quantity" :class="{'m:hidden':hidden}" v-html="' - ' + total + ' item(s)'"></span>
          </span>
        </div>
      </div>`
    }
    usf.register(UsfInventory, null, 'usf-inventory');

    /**
     * Trigger event initialization for wishlist button and compare button (NOTE: Different for each version)
     */
    usf.event.add(['sr_updated', 'sr_viewChanged', 'rerender'], function () {
        setTimeout(function () {
            // window.MinimogTheme && MinimogTheme.Wishlist && MinimogTheme.Wishlist.setWishlistButtonsState();
            if(window.MinimogTheme){
                MinimogTheme.CompareProduct && MinimogTheme.CompareProduct.setCompareButtonsState();
                MinimogTheme.Wishlist && MinimogTheme.Wishlist.setWishlistButtonsState();
            }
            _usfLoadImage();
            // _usfInitQuickAdd();
        }, 300); 
    }); 
});
function _usfLoadImage(){
    document.querySelectorAll('responsive-image').forEach(el => {
        el.removeAttribute("data-image-loading");
        el.classList.add("m-image-loaded")
    })
}

/**
 * Get product.description for list view
 * @param {product.description} desc 
 * @returns 
 */
function _usfListDesc(desc) {
    if (!desc)
        return '';
    var str = desc.replace(/<style[^>]*>.*<\/style>/gm, '')
        .replace(/<script[^>]*>.*<\/script>/gm, '')
        .replace(/<[^>]+>/gm, '')
        .replace(/([\r\n]+ +)+/gm, '')
        .replace(/\n/g, ' ');
    str = str.split(' ');
    var newArr = [];
    str.forEach(s => {
        if (s != "") {
            newArr.push(s)
        }
    })
    return newArr.slice(0, 30).join(' ') + '...'
}
function _usfOnAddToCartSuccess(rs, formSelector) {
}

function _usfSetDefaultSettings(){
    window._usfGlobalSettings = window._usfGlobalSettings || {
        show_second_img: true,
        pcard_image_ratio: "1\/1",
        show_badge_sale: true,
        on_sale_badge: "show_percentage",
        on_sale_badge: "show_percentage",
        show_badge_soldout: true,
        select_option_button_action: "link",
        show_wishlist_button: true,
        show_compare_button: true,
        show_quickview_button: true,
        show_cart_button: true,
        show_vendor: true,
        pcard_alignment: "center",
        uppercase_prd_name: true,
        pcard_layout: "3",
    };
    
    
    
    //window._usf_initial_column = window._usf_initial_column || "3";
    window._usf_initial_column = "1";
    window._usfNoImageSvg = window._usfNoImageSvg || "\u003csvg class=\"m-placeholder-svg\" xmlns=\"http:\/\/www.w3.org\/2000\/svg\" viewBox=\"0 0 525.5 525.5\"\u003e\u003cpath d=\"M375.5 345.2c0-.1 0-.1 0 0 0-.1 0-.1 0 0-1.1-2.9-2.3-5.5-3.4-7.8-1.4-4.7-2.4-13.8-.5-19.8 3.4-10.6 3.6-40.6 1.2-54.5-2.3-14-12.3-29.8-18.5-36.9-5.3-6.2-12.8-14.9-15.4-17.9 8.6-5.6 13.3-13.3 14-23 0-.3 0-.6.1-.8.4-4.1-.6-9.9-3.9-13.5-2.1-2.3-4.8-3.5-8-3.5h-54.9c-.8-7.1-3-13-5.2-17.5-6.8-13.9-12.5-16.5-21.2-16.5h-.7c-8.7 0-14.4 2.5-21.2 16.5-2.2 4.5-4.4 10.4-5.2 17.5h-48.5c-3.2 0-5.9 1.2-8 3.5-3.2 3.6-4.3 9.3-3.9 13.5 0 .2 0 .5.1.8.7 9.8 5.4 17.4 14 23-2.6 3.1-10.1 11.7-15.4 17.9-6.1 7.2-16.1 22.9-18.5 36.9-2.2 13.3-1.2 47.4 1 54.9 1.1 3.8 1.4 14.5-.2 19.4-1.2 2.4-2.3 5-3.4 7.9-4.4 11.6-6.2 26.3-5 32.6 1.8 9.9 16.5 14.4 29.4 14.4h176.8c12.9 0 27.6-4.5 29.4-14.4 1.2-6.5-.5-21.1-5-32.7zm-97.7-178c.3-3.2.8-10.6-.2-18 2.4 4.3 5 10.5 5.9 18h-5.7zm-36.3-17.9c-1 7.4-.5 14.8-.2 18h-5.7c.9-7.5 3.5-13.7 5.9-18zm4.5-6.9c0-.1.1-.2.1-.4 4.4-5.3 8.4-5.8 13.1-5.8h.7c4.7 0 8.7.6 13.1 5.8 0 .1 0 .2.1.4 3.2 8.9 2.2 21.2 1.8 25h-30.7c-.4-3.8-1.3-16.1 1.8-25zm-70.7 42.5c0-.3 0-.6-.1-.9-.3-3.4.5-8.4 3.1-11.3 1-1.1 2.1-1.7 3.4-2.1l-.6.6c-2.8 3.1-3.7 8.1-3.3 11.6 0 .2 0 .5.1.8.3 3.5.9 11.7 10.6 18.8.3.2.8.2 1-.2.2-.3.2-.8-.2-1-9.2-6.7-9.8-14.4-10-17.7 0-.3 0-.6-.1-.8-.3-3.2.5-7.7 3-10.5.8-.8 1.7-1.5 2.6-1.9h155.7c1 .4 1.9 1.1 2.6 1.9 2.5 2.8 3.3 7.3 3 10.5 0 .2 0 .5-.1.8-.3 3.6-1 13.1-13.8 20.1-.3.2-.5.6-.3 1 .1.2.4.4.6.4.1 0 .2 0 .3-.1 13.5-7.5 14.3-17.5 14.6-21.3 0-.3 0-.5.1-.8.4-3.5-.5-8.5-3.3-11.6l-.6-.6c1.3.4 2.5 1.1 3.4 2.1 2.6 2.9 3.5 7.9 3.1 11.3 0 .3 0 .6-.1.9-1.5 20.9-23.6 31.4-65.5 31.4h-43.8c-41.8 0-63.9-10.5-65.4-31.4zm91 89.1h-7c0-1.5 0-3-.1-4.2-.2-12.5-2.2-31.1-2.7-35.1h3.6c.8 0 1.4-.6 1.4-1.4v-14.1h2.4v14.1c0 .8.6 1.4 1.4 1.4h3.7c-.4 3.9-2.4 22.6-2.7 35.1v4.2zm65.3 11.9h-16.8c-.4 0-.7.3-.7.7 0 .4.3.7.7.7h16.8v2.8h-62.2c0-.9-.1-1.9-.1-2.8h33.9c.4 0 .7-.3.7-.7 0-.4-.3-.7-.7-.7h-33.9c-.1-3.2-.1-6.3-.1-9h62.5v9zm-12.5 24.4h-6.3l.2-1.6h5.9l.2 1.6zm-5.8-4.5l1.6-12.3h2l1.6 12.3h-5.2zm-57-19.9h-62.4v-9h62.5c0 2.7 0 5.8-.1 9zm-62.4 1.4h62.4c0 .9-.1 1.8-.1 2.8H194v-2.8zm65.2 0h7.3c0 .9.1 1.8.1 2.8H259c.1-.9.1-1.8.1-2.8zm7.2-1.4h-7.2c.1-3.2.1-6.3.1-9h7c0 2.7 0 5.8.1 9zm-7.7-66.7v6.8h-9v-6.8h9zm-8.9 8.3h9v.7h-9v-.7zm0 2.1h9v2.3h-9v-2.3zm26-1.4h-9v-.7h9v.7zm-9 3.7v-2.3h9v2.3h-9zm9-5.9h-9v-6.8h9v6.8zm-119.3 91.1c-2.1-7.1-3-40.9-.9-53.6 2.2-13.5 11.9-28.6 17.8-35.6 5.6-6.5 13.5-15.7 15.7-18.3 11.4 6.4 28.7 9.6 51.8 9.6h6v14.1c0 .8.6 1.4 1.4 1.4h5.4c.3 3.1 2.4 22.4 2.7 35.1 0 1.2.1 2.6.1 4.2h-63.9c-.8 0-1.4.6-1.4 1.4v16.1c0 .8.6 1.4 1.4 1.4H256c-.8 11.8-2.8 24.7-8 33.3-2.6 4.4-4.9 8.5-6.9 12.2-.4.7-.1 1.6.6 1.9.2.1.4.2.6.2.5 0 1-.3 1.3-.8 1.9-3.7 4.2-7.7 6.8-12.1 5.4-9.1 7.6-22.5 8.4-34.7h7.8c.7 11.2 2.6 23.5 7.1 32.4.2.5.8.8 1.3.8.2 0 .4 0 .6-.2.7-.4 1-1.2.6-1.9-4.3-8.5-6.1-20.3-6.8-31.1H312l-2.4 18.6c-.1.4.1.8.3 1.1.3.3.7.5 1.1.5h9.6c.4 0 .8-.2 1.1-.5.3-.3.4-.7.3-1.1l-2.4-18.6H333c.8 0 1.4-.6 1.4-1.4v-16.1c0-.8-.6-1.4-1.4-1.4h-63.9c0-1.5 0-2.9.1-4.2.2-12.7 2.3-32 2.7-35.1h5.2c.8 0 1.4-.6 1.4-1.4v-14.1h6.2c23.1 0 40.4-3.2 51.8-9.6 2.3 2.6 10.1 11.8 15.7 18.3 5.9 6.9 15.6 22.1 17.8 35.6 2.2 13.4 2 43.2-1.1 53.1-1.2 3.9-1.4 8.7-1 13-1.7-2.8-2.9-4.4-3-4.6-.2-.3-.6-.5-.9-.6h-.5c-.2 0-.4.1-.5.2-.6.5-.8 1.4-.3 2 0 0 .2.3.5.8 1.4 2.1 5.6 8.4 8.9 16.7h-42.9v-43.8c0-.8-.6-1.4-1.4-1.4s-1.4.6-1.4 1.4v44.9c0 .1-.1.2-.1.3 0 .1 0 .2.1.3v9c-1.1 2-3.9 3.7-10.5 3.7h-7.5c-.4 0-.7.3-.7.7 0 .4.3.7.7.7h7.5c5 0 8.5-.9 10.5-2.8-.1 3.1-1.5 6.5-10.5 6.5H210.4c-9 0-10.5-3.4-10.5-6.5 2 1.9 5.5 2.8 10.5 2.8h67.4c.4 0 .7-.3.7-.7 0-.4-.3-.7-.7-.7h-67.4c-6.7 0-9.4-1.7-10.5-3.7v-54.5c0-.8-.6-1.4-1.4-1.4s-1.4.6-1.4 1.4v43.8h-43.6c4.2-10.2 9.4-17.4 9.5-17.5.5-.6.3-1.5-.3-2s-1.5-.3-2 .3c-.1.2-1.4 2-3.2 5 .1-4.9-.4-10.2-1.1-12.8zm221.4 60.2c-1.5 8.3-14.9 12-26.6 12H174.4c-11.8 0-25.1-3.8-26.6-12-1-5.7.6-19.3 4.6-30.2H197v9.8c0 6.4 4.5 9.7 13.4 9.7h105.4c8.9 0 13.4-3.3 13.4-9.7v-9.8h44c4 10.9 5.6 24.5 4.6 30.2z\"\/\u003e\u003cpath d=\"M286.1 359.3c0 .4.3.7.7.7h14.7c.4 0 .7-.3.7-.7 0-.4-.3-.7-.7-.7h-14.7c-.3 0-.7.3-.7.7zm5.3-145.6c13.5-.5 24.7-2.3 33.5-5.3.4-.1.6-.5.4-.9-.1-.4-.5-.6-.9-.4-8.6 3-19.7 4.7-33 5.2-.4 0-.7.3-.7.7 0 .4.3.7.7.7zm-11.3.1c.4 0 .7-.3.7-.7 0-.4-.3-.7-.7-.7H242c-19.9 0-35.3-2.5-45.9-7.4-.4-.2-.8 0-.9.3-.2.4 0 .8.3.9 10.8 5 26.4 7.5 46.5 7.5h38.1zm-7.2 116.9c.4.1.9.1 1.4.1 1.7 0 3.4-.7 4.7-1.9 1.4-1.4 1.9-3.2 1.5-5-.2-.8-.9-1.2-1.7-1.1-.8.2-1.2.9-1.1 1.7.3 1.2-.4 2-.7 2.4-.9.9-2.2 1.3-3.4 1-.8-.2-1.5.3-1.7 1.1s.2 1.5 1 1.7z\"\/\u003e\u003cpath d=\"M275.5 331.6c-.8 0-1.4.6-1.5 1.4 0 .8.6 1.4 1.4 1.5h.3c3.6 0 7-2.8 7.7-6.3.2-.8-.4-1.5-1.1-1.7-.8-.2-1.5.4-1.7 1.1-.4 2.3-2.8 4.2-5.1 4zm5.4 1.6c-.6.5-.6 1.4-.1 2 1.1 1.3 2.5 2.2 4.2 2.8.2.1.3.1.5.1.6 0 1.1-.3 1.3-.9.3-.7-.1-1.6-.8-1.8-1.2-.5-2.2-1.2-3-2.1-.6-.6-1.5-.6-2.1-.1zm-38.2 12.7c.5 0 .9 0 1.4-.1.8-.2 1.3-.9 1.1-1.7-.2-.8-.9-1.3-1.7-1.1-1.2.3-2.5-.1-3.4-1-.4-.4-1-1.2-.8-2.4.2-.8-.3-1.5-1.1-1.7-.8-.2-1.5.3-1.7 1.1-.4 1.8.1 3.7 1.5 5 1.2 1.2 2.9 1.9 4.7 1.9z\"\/\u003e\u003cpath d=\"M241.2 349.6h.3c.8 0 1.4-.7 1.4-1.5s-.7-1.4-1.5-1.4c-2.3.1-4.6-1.7-5.1-4-.2-.8-.9-1.3-1.7-1.1-.8.2-1.3.9-1.1 1.7.7 3.5 4.1 6.3 7.7 6.3zm-9.7 3.6c.2 0 .3 0 .5-.1 1.6-.6 3-1.6 4.2-2.8.5-.6.5-1.5-.1-2s-1.5-.5-2 .1c-.8.9-1.8 1.6-3 2.1-.7.3-1.1 1.1-.8 1.8 0 .6.6.9 1.2.9z\"\/\u003e\u003c\/svg\u003e";
    window._usf_animated = window._usf_animated || false;
    window._usf_animation_effect = window._usf_animation_effect || "none";
    window._usfSizes = window._usfSizes || "(min-width: 1400px) 317px, (min-width: 990px) calc((100vw - 130px) / 4), (min-width: 750px) calc((100vw - 120px) / 3), calc((100vw - 35px) / 2)";
    window._usfCountdownTrans = window._usfCountdownTrans || {
        days: "days",
        hrs: "hrs",
        mins: "mins",
        secs: "secs",
    };
    if (!window._usfAddToCompare || window._usfAddToCompare.includes('missing')) {
        window._usfAddToCompare || "Compare";
    }
    if (!window._usfRemoveToCompare || window._usfRemoveToCompare.includes('missing')) {
        window._usfRemoveToCompare || "Remove from compare";
    }
    if (!window._usfAddToWishlistText || window._usfAddToWishlistText.includes('missing')) {
        window._usfAddToWishlistText || "Add to wishlist";
    }
    if (!window._usfRemoveFromWishlistText || window._usfRemoveFromWishlistText.includes('missing')) {
        window._usfRemoveFromWishlistText || "Remove from wishlist";
    }
    if (!window._usfZoominText || window._usfZoominText.includes('missing')) {
        window._usfZoominText || "Zoom in";
    }
    if (!window._usfQuickAddTxt || window._usfQuickAddTxt.includes('missing')) {
        window._usfQuickAddTxt || "Zoom in";
    }
}
window._usf_dataProduct = {};
var _dataProduct = function (p) {
    if(window._usf_dataProduct && _usf_dataProduct[p.id]){
        return `<script type="application/json">
        ${JSON.stringify(_usf_dataProduct[p.id])}
       </script>`
    }
    var product = JSON.parse(JSON.stringify(p));
    var pow = Math.pow(10, usf.settings.decimals);
    product.variants.filter(v => {
        var img = p.images[v.imageIndex];
        if(img){
            v.featured_media = {
                preview_image: {
                    src: img.url,
                    width: img.width,
                    height: img.height
                }
            }
        }
        if (v.options.length) {
            v.options.filter((o, index) => {
                if(product.options[index] != undefined)
                    v[`option${index + 1}`] = product.options[index].values[o];;
            });
            v.title = _usfGetVariantTitle(v.options,p);;
        } else {
            v.options = ['Default Title'];
            v.option1 = "Default Title";
            v.title = "Default Title"
        }
        v.inventory_management = "shopify";
        v.available = v.available > 0 ? true : false;
        v.compare_at_price = v.compareAtPrice * pow;
        v.name = product.title;
        v.price = v.price * pow;
        v.taxable = true
    });
    _usf_dataProduct[p.id] = product.variants;

    return `<script type="application/json">
   ${JSON.stringify(product.variants)}
  </script>`
}
function _usfGetVariantTitle(options, p) {
    if(!p.options.length)
        return 'Default title'
    var arrs = [];
    for (let i = 0; i < options.length; i++) {
        var o = options[i];
        arrs.push(p.options[i].values[o])
    }
    return arrs.join(' / ');
}


/* Begin theme ready code */
if (usf.settings.instantSearch.online && usf.isMobile) {
    // click on search icon -> show our instant search
    var searchIcon = document.querySelector('m-search-popup');
    if (searchIcon)
        searchIcon.addEventListener('click',function(){
            var target  = document.createElement('input');
            usf.utils.loadAndShowInstantSearch(target, true);
        });

    var searchIconBottom = document.querySelector('.m-mobile-sticky-bar--item[data-open-search-popup]');
    if (searchIconBottom)
    searchIconBottom.addEventListener('click',function(){
            var target  = document.createElement('input');
            usf.utils.loadAndShowInstantSearch(target, true);
        });

    // still register to 'is_show' event to hide the drawer.
    usf.event.add('is_show', function () {
        setTimeout(() => {
            var closeSearch = document.querySelector('[data-close-search]');
            if(closeSearch)
                closeSearch.click();
            // refocus on our input box
            usf.instantSearch.focus();
        }, 300);
    })
}
/* End theme ready code */