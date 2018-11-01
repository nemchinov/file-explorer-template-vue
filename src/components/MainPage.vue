<template>
    <div class="page-content">
        <v-layout row wrap>
            <v-flex xs12 class="data-box" v-if="view==='icons'">
                <template v-if="!search">
                    <file :item="file" v-for="file in pathForShow" @folderClick="onFolderClick"></file>
                </template>
                <template v-if="search">
                    <file :item="file" v-for="file in searchResults"></file>
                </template>
            </v-flex>
            <v-flex xs12 class="data-box" v-if="view==='list'">
                <files-list :items="pathForShow" @folderClick="onFolderClick" @remove="remove" v-if="!search"></files-list>
                <files-list :items="searchResults" v-if="search" @remove="remove"></files-list>
            </v-flex>
        </v-layout>
    </div>
</template>

<script>
    import File from './file.vue';
    import List from './list.vue';

    export default {
        name: 'MainPage',
        created() {
            this.getCatalogs().then((paths) => {
                this.pathData = paths;
                this.selectPath(paths);
            });
        },
        props: ['changeFolder', 'selectedPath', 'search', 'view'],
        components: {
            File,
            'files-list': List
        },
        data() {
            return {
                pathData: [],
                path: [],
                pathForShow: [],
                searchResults: []
            };
        },
        methods: {
            selectPath (path) {
                if (this.path.length > 0) {
                    this.path[this.path.length - 1].disabled = false;
                }

                this.pathForShow = path.children;

                this.path.push({
                    text: path.name,
                    disabled: true
                });

                this.$emit('changeFolder', this.path);
            },
            onFolderClick (item) {
                this.selectPath(item);
            },
            getDataSearch (data, mask) {
                let result = [];

                data.forEach((file) => {
                    if (file.type === 'dir' && file.children.length) {
                        result.push(...this.getDataSearch(file.children, mask));
                    } else if (file.type === 'file' && file.name.indexOf(mask) >= 0) {
                        result.push(file);
                    }
                });

                return result;
            },
            remove (item) {
                let i = -1;
                this.pathForShow.forEach((v, index) => {
                   if(v.name === item.name) {
                       i = index;
                   }
                });
                if (i !== -1) {
                    this.pathForShow.splice(i, 1);
                }
            },
            getCatalogs () {
                return Promise.resolve({
                    "name": "photos", "type": "dir",
                    "children": [{
                        "name": "summer", "type": "dir",
                        "children": [{
                            "name": "june", "type": "dir",
                            "children": [{
                                "name": "windsurf.jpg", "type": "file", "size": '100 kb', "date": '2018-01-10 23:02:12'
                            }]
                        }]
                    }, {
                        "name": "winter", "type": "dir",
                            "children": [{
                                "name": "january", "type": "dir",
                                "children": [{
                                    "name": "ski.png", "type": "file", "size": '400 kb', "date": '2018-01-10 23:02:12'
                                }, {
                                    "name": "snowboard.jpg", "type": "file", "size": '200 kb', "date": '2018-01-10 23:02:12'
                                }]
                            }]
                    },{
                        "name": "hh.jpg", "type": "file", "size": '200 kb', "date": '2018-01-10 23:02:12'
                    },{
                        "name": "hh1.jpg", "type": "file", "size": '200 kb', "date": '2018-01-10 23:02:12'
                    },{
                        "name": "hh2.jpg", "type": "file", "size": '200 kb', "date": '2018-01-10 23:02:12'
                    },{
                        "name": "hh3.jpg", "type": "file", "size": '200 kb', "date": '2018-01-10 23:02:12'
                    },{
                        "name": "hh4.jpg", "type": "file", "size": '200 kb', "date": '2018-01-10 23:02:12'
                    },{
                        "name": "hh5.jpg", "type": "file", "size": '200 kb', "date": '2018-01-10 23:02:12'
                    },{
                        "name": "hh6.jpg", "type": "file", "size": '200 kb', "date": '2018-01-10 23:02:12'
                    },{
                        "name": "hh7.jpg", "type": "file", "size": '200 kb', "date": '2018-01-10 23:02:12'
                    },{
                        "name": "hh89.jpg", "type": "file", "size": '200 kb', "date": '2018-01-10 23:02:12'
                    },{
                        "name": "hh9.jpg", "type": "file", "size": '200 kb', "date": '2018-01-10 23:02:12'
                    },{
                        "name": "hh10.jpg", "type": "file", "size": '200 kb', "date": '2018-01-10 23:02:12'
                    },{
                        "name": "hh11.jpg", "type": "file", "size": '200 kb', "date": '2018-01-10 23:02:12'
                    }]
                })
            }
        },
        watch: {
            selectedPath (pathIndex) {
                if (pathIndex === this.path.length - 1) { return; }

                let selectedPath = this.pathData;

                this.path.forEach((path, index) => {
                    if (index > 0 && index <= pathIndex) {
                        let find = false;
                        selectedPath.children.forEach((el) => {
                            if (el.name === path.text && !find) {
                                selectedPath = el;
                                find = true;
                            }
                        });
                    }
                });

                this.path = this.path.slice(0, pathIndex);

                this.selectPath(selectedPath);
            },
            search (search) {
                if (!search) { return; }

                this.searchResults = this.getDataSearch(this.pathData.children, search);


            }
        }
    }
</script>

<style lang="stylus">
    .data-box {
        height: 85vh !important;
        padding: 15px 30px 30px 30px;
        overflow-y: auto;
    }

    @media only screen and (max-width : 750px) {
        .data-box {
            text-align: center;
        }
    }

    .data-box > * {
        margin-right: 20px;
        margin-bottom: 20px;
    }
</style>