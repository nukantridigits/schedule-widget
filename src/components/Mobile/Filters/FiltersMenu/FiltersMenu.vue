<template>
    <div class="filters_menu">
        <div class="filters_menu_top">
            <FiltersMenuItem
                    v-for="filter in this.filtersSectionList"
                    :key="filter.id + '-' + filter.alias"
                    :filter-item="filter"
            />
        </div>
        <div class="filters_menu_bottom">
            <FiltersMenuCheckboxGroup />
            <LinkText size="s" class="resetAllFiltersBtn" @click.native="resetAllMenuFilters">
                    Сбросить все
            </LinkText>
        </div>
    </div>
</template>

<script>
    import {storeToComputed} from "../../../mixins/storeToComputed";
    import FiltersMenuItem from "./FiltersMenuItem";
    import FiltersMenuCheckboxGroup from "./FiltersMenuCheckboxGroup";
    import LinkText from "../../../../LinkText";
    import {eventBus} from "../../../../main";

    export default {
        name: "Filters",
        mixins: [storeToComputed],
        components: {
            LinkText,
            FiltersMenuItem, FiltersMenuCheckboxGroup
        },
        methods: {
            resetAllMenuFilters: function () {
                this.$store.dispatch('filters/clearFilters');
                eventBus.$emit('resetAllMenuFilters');
            }
        }
    };
</script>
