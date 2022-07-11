<script setup lang="ts">
import { ref, computed } from "vue";

const title = ref("");
const projects = ref("");
const msg = ref("");
const link = computed(() => {
  const base = "https://phabricator.wikimedia.org/maniphest/task/edit/form/1/?";
  const titleQuery = "title=" + encodeURIComponent(title.value);
  const projectsQuery = "tags=" + encodeURIComponent(projects.value);
  const descriptionQuery = "description=" + encodeURIComponent(msg.value);
  const phabLink =
    base + titleQuery + "&" + projectsQuery + "&" + descriptionQuery;

  return phabLink;
});
</script>

<template>
  <h1>Phabricator Template Builder</h1>
  <form>
    <div>
      <label for="title">Title</label>
      <input id="title" v-model="title" />
    </div>
    <div>
      <label for="projects">Projects</label>
      <input id="projects" v-model="projects" />
    </div>
    <div>
      <label for="description">Description</label>
      <textarea id="description" class="description" v-model="msg"></textarea>
    </div>
  </form>
  <a :href="link">open project in phabricator</a>
</template>

<style>
.description {
  width: 100%;
  height: 50em;
}
</style>
