<template>
    <v-data-table
            :headers="headers"
            :items="items"
            hide-actions
            :pagination.sync="pagination"
            :rows-per-page-items="[-1]"
            class="elevation-1"
    >
        <template slot="items" slot-scope="props">
            <td class="file-name" @click="onItemClick(props.item)">
                <v-icon color="blue lighten-1" v-if="props.item.type === 'dir'">folder</v-icon>
                <v-icon color="green lighten-1" v-if="props.item.type !== 'dir'">insert_drive_file</v-icon>
                {{ props.item.name }}
            </td>
            <td class="text-xs-right">{{ props.item.size }}</td>
            <td class="text-xs-right">{{ props.item.type === 'dir' ? 'папка' : 'файл' }}</td>
            <td class="text-xs-right">{{ props.item.date }}</td>
            <td class="text-xs-right">
                <v-btn flat icon color="red" @click="remove(props.item)">
                    <v-icon>clear</v-icon>
                </v-btn>
            </td>
        </template>
    </v-data-table>
</template>

<script>
    export default {
        name: 'List',
        props: ['items'],
        data() {
            return {
                pagination: {
                    sortBy: 'type'
                },
                headers: [
                    { text: 'Имя', value: 'name' },
                    { text: 'Размер', value: 'size', align: 'right' },
                    { text: 'Тип', value: 'type', align: 'right' },
                    { text: 'Последнее изменение', value: 'date', align: 'right' },
                    { text: '', value: 'remove', sortable: false, align: 'left' }
                ],
            };
        },
        methods: {
            onItemClick(item) {
                if (item.type !== 'dir') {
                    alert('Download');
                } else {
                    this.$emit('folderClick', item);
                }
            },
            remove(item) {
                this.$emit('remove', item);
            }
        }
    }
</script>

<style lang="stylus">
    td i {
        margin-top: -2px;
    }
    td.file-name { cursor:pointer; }
</style>