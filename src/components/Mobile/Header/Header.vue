<template>
    <div class="header">
        <ShowFiltersButton @click.native="showFilters"/>
    </div>
</template>

<script>
    import ShowFiltersButton from "./ShowFiltersButton";
    import {eventBus} from "../../../main";

    export default {
        name: "Header",
        components: {ShowFiltersButton},
        methods: {
          showFilters() {
              eventBus.$emit('showFilters',true);
          }
        },
    };
</script>
