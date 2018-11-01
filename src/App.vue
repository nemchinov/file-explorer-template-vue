<template>
  <v-app :class="{ 'theme--dark': theme === 'dark' }">
    <v-toolbar fixed app>
      <v-toolbar-title>File explorer</v-toolbar-title>
      <v-breadcrumbs divider="/" v-if="!search">
        <v-breadcrumbs-item
          v-for="(item, index) in folders"
          :key="index"
          :disabled="item.disabled"
        >
          <span @click="onPathClick(index, item.disabled)">{{ item.text }}</span>
        </v-breadcrumbs-item>
      </v-breadcrumbs>
      <v-subheader v-if="search">Search results</v-subheader>
      <v-spacer></v-spacer>
      <v-text-field
        light
        solo
        ref="search"
        v-if='showSearch'
        @blur="showSearch=false"
        v-model="search"
        placeholder="Search...">
      </v-text-field>
      <v-btn icon @click="activateSearch">
        <v-icon>search</v-icon>
      </v-btn>
      <v-btn icon @click="showMenu = !showMenu">
        <v-icon v-if="!showMenu">keyboard_arrow_left</v-icon>
        <v-icon v-if="showMenu">keyboard_arrow_right</v-icon>
      </v-btn>
      <div v-show="showMenu">
        <v-btn-toggle v-model="theme" mandatory>
          <v-btn flat value="dark">
            dark
          </v-btn>
          <v-btn flat value="light">
            light
          </v-btn>
        </v-btn-toggle>
        <v-btn icon @click="toggleView">
          <v-icon v-if="view==='icons'">apps</v-icon>
          <v-icon v-if="view==='list'">list</v-icon>
        </v-btn>
      </div>
    </v-toolbar>
    <v-content class="page-data">
      <main-page @changeFolder="changeFolder" :selectedPath="selectedPath" :search="search" :view="view"></main-page>
    </v-content>
  </v-app>
</template>

<script>
  import MainPage from './components/MainPage.vue';

  export default {
      name: 'App',
      components: {
          MainPage
      },
      created () {
          let view = this.$user.getView();
          this.view = view && view !== 'null' ? view : this.view;
          this.theme = this.$user.getTheme() || this.theme;
      },
      data () {
          return {
              showSearch: false,
              search: '',
              folders: [],
              selectedPath: 0,
              theme: 'dark',
              view: 'icons',
              showMenu: false
          };
      },
      methods: {
          activateSearch () {
              this.showSearch = true;
              this.$nextTick(() => this.$refs.search.focus());
          },
          changeFolder(folders) {
              this.folders = folders;
              this.selectedPath = folders.length - 1;
          },
          onPathClick(index, disabled) {
              if(disabled) { return; }
              this.selectedPath = index;
          },
          toggleView () {
              this.view = this.view === 'list' ? 'icons' : 'list';
          }
      },
      watch: {
          view (v) {
              this.$user.setView(v);
          },
          theme (v) {
              this.$user.setTheme(v);
          }
      }
  }
</script>

<style>
  html {
    overflow:hidden;
  }
  .page-data {
    margin-top: 20px;
  }
  .toolbar .breadcrumbs {
    margin: 0px 0px -5px 21px;
  }
  .theme--dark .toolbar .breadcrumbs .breadcrumbs__item {
    color: #ffffff;
  }
  .theme--dark .toolbar .breadcrumbs .breadcrumbs__item:hover {
    color: #007cb0;
  }
  .theme--dark .toolbar .breadcrumbs .breadcrumbs__item--disabled{
    color: rgba(191, 187, 187, 0.76) !important;
  }
  .theme--dark .toolbar .input-group--text-field {
    box-shadow: 0 1px;
    color: white !important;
  }
  .toolbar .subheader {
    margin-top: 3px;
    font-size: 19px;
  }
</style>