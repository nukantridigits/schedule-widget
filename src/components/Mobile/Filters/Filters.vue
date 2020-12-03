<template>
        <div class="filters">
            <FiltersHeader/>
            <FiltersMenu v-if="this.selectedFilterSection === ''"/>
            <ClubFilter v-if="showSection('club')" />
            <TrainerFilter v-if="showSection('trainer')" />
            <TrainingFilter v-if="showSection('training')" />
            <PlaceFilter v-if="showSection('place')" />
        </div>
</template>

<script>
import FiltersHeader from "./FiltersHeader/FiltersHeader";
import FiltersMenu from "./FiltersMenu/FiltersMenu";
import ClubFilter from "./ClubFilter";
import TrainerFilter from "./TrainerFilter";
import TrainingFilter from "./TrainingFilter";
import PlaceFilter from "./PlaceFilter";
import {storeToComputed} from "../../mixins/storeToComputed";

export default {
    name: "Filters",
    mixins: [storeToComputed],
    components: {
        FiltersHeader,
        FiltersMenu, ClubFilter, TrainerFilter, TrainingFilter, PlaceFilter
    },
    methods: {
        showSection: function (alias) {
            const selectedSection = this.selectedFilterSection;
            const filtersList = this.filtersSectionList;
            if (selectedSection !== '') {
                if ((alias === filtersList.club.alias) && (selectedSection === filtersList.club.alias)) return true
                if ((alias === filtersList.training.alias) && (selectedSection === filtersList.training.alias)) return true
                if ((alias === filtersList.trainer.alias) && (selectedSection === filtersList.trainer.alias)) return true
                if ((alias === filtersList.place.alias) && (selectedSection === filtersList.place.alias)) return true
            }

            return false;
        }
    },
};
</script>
