<template>
    <v-card class="file-card">
        <v-list-tile @click="onItemClick">
            <v-list-tile-avatar>
                <v-icon class="blue lighten-1 white--text" v-if="item.type === 'dir'">folder</v-icon>
                <v-icon class="green lighten-1 white--text" v-if="item.type !== 'dir'">insert_drive_file</v-icon>
            </v-list-tile-avatar>
            <v-list-tile-content>
                <v-list-tile-title>{{item.name}}</v-list-tile-title>
                <v-list-tile-sub-title v-if="item.type === 'dir'">{{item.children.length}} items</v-list-tile-sub-title>
                <v-list-tile-sub-title v-if="item.type !== 'dir'">{{item.size}}</v-list-tile-sub-title>
            </v-list-tile-content>
        </v-list-tile>
    </v-card>
</template>

<script>
    export default {
        name: 'File',
        props: ['item'],
        data() {
            return { };
        },
        methods: {
            onItemClick() {
                if (this.item.type !== 'dir') {
                    alert('Download');
                } else {
                    this.$emit('folderClick', this.item);
                }
            }
        }
    }
</script>

<style lang="stylus">
    .card.file-card {
        height: auto;
        width: 200px;
        border-radius: 5px;
        cursor: pointer;
        display: inline-block;
    }
    .card.file-card > div {
        padding: 12px;
    }
    .theme--dark .card.file-card > div {
        background-color: #373743;
    }
    .theme--dark .card.file-card i {
        color: #373743 !important;
    }
    .theme--dark.theme--light .card.file-card > div:hover {
        background-color: #575767 !important;
    }
    .theme--dark.theme--light .card.file-card > div:hover i {
        color: #575767 !important;
    }
    .theme--light .card.file-card > div:hover {
        background-color: #e0e0f4 !important;
    }
    .theme--light .card.file-card > div:hover i {
        color: #e0e0f4 !important;
    }
</style>