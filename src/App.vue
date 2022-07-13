<script setup lang="ts">
import { ref } from "vue";

const title = ref("");
const tags = ref("");
const description = ref("");
const link = ref("");

const base = "https://phabricator.wikimedia.org/maniphest/task/edit/form/1/?";

// https://phabricator.wikimedia.org/maniphest/task/edit/form/1/?title=Wikidata+Ticket+Template&description=foo&tags=wikidata,accessibility

function parseLink() {
  let url;
  try {
    url = new URL(link.value);
  } catch (e) {
    // TODO: show error message
    console.error(e);
    throw e;
  }
  console.log(url);

  // TODO: more validation

  const params = url.searchParams;
  title.value = params.get("title") || "";
  tags.value = params.get("tags") || "";
  description.value = params.get("description") || "";
}

function rebuildLink() {
  const url = new URL(base);
  const params = url.searchParams;
  params.set("title", title.value);
  params.set("tags", tags.value);
  params.set("description", description.value);
  link.value = url.href;
}
</script>

<template>
  <h1>Phabricator Template Builder</h1>
  <form>
    <div>
      <label for="link">Link (paste existing one here to edit)</label>
      <input id="link" v-model="link" :placeholder="base" @input="parseLink" />
      <a :href="link">Open link in phabricator</a>
    </div>

    <div>
      <label for="title">Title</label>
      <input id="title" v-model="title" @input="rebuildLink" />
    </div>
    <div>
      <label for="tags">Tags</label>
      <input id="tags" v-model="tags" @input="rebuildLink" />
    </div>
    <div>
      <label for="description">Description</label>
      <textarea
        id="description"
        class="description"
        v-model="description"
        @input="rebuildLink"
      ></textarea>
    </div>
  </form>
</template>

<style>
.description {
  width: 100%;
  height: 50em;
}
</style>
