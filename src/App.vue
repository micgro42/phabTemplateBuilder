<script setup lang="ts">
import { ref } from "vue";
import { CdxTextInput, CdxButton, CdxMessage } from "@wikimedia/codex";

const title = ref("");
const tags = ref("");
const description = ref("");
const link = ref("");
const hasError = ref(false);

const base = "https://phabricator.wikimedia.org/maniphest/task/edit/form/1/?";

function parseLink() {
  let url;
  try {
    url = new URL(link.value);
    hasError.value = false;
  } catch (e) {
    console.debug(e);
    hasError.value = true;
    return;
  }

  // TODO: more validation

  const params = url.searchParams;
  title.value = params.get("title") || "";
  tags.value = params.get("tags") || "";
  description.value = params.get("description") || "";
}

function rebuildLink() {
  hasError.value = false;
  const url = new URL(base);
  const params = url.searchParams;
  params.set("title", title.value);
  params.set("tags", tags.value);
  params.set("description", description.value);
  link.value = url.href;
}

function copyLinkToClipboard() {
  navigator.clipboard.writeText(link.value);
}

function buildTime(): string | false {
  const buildDate = new Date();
  if (!process.env.VUE_APP_BUILD_TIME) {
    return false;
  }
  buildDate.setTime(parseInt(process.env.VUE_APP_BUILD_TIME));
  return buildDate.toUTCString();
}
</script>

<template>
  <h1>Phabricator Task Template Builder</h1>
  <form @submit.prevent>
    <div>
      <label for="link">
        Link (optionally paste existing template link here to edit)
      </label>
      <cdx-text-input
        id="link"
        v-model="link"
        :placeholder="base"
        @input="parseLink"
      />
      <cdx-button @click="copyLinkToClipboard">Copy</cdx-button>
      <a :href="link" v-if="link && !hasError" target="_blank">
        Open link to phabricator
      </a>
    </div>

    <cdx-message type="error" v-if="hasError">
      The link you entered is not a valid phabricator link. Maybe start with the
      inputs below.
    </cdx-message>

    <div style="margin-top: 1em">
      <label for="title">Title</label>
      <cdx-text-input
        id="title"
        placeholder="Chore: update dependencies"
        v-model="title"
        @input="rebuildLink"
      />
    </div>
    <div>
      <label for="tags">Tags (comma separated)</label>
      <cdx-text-input
        id="tags"
        placeholder="wikidata,codex"
        v-model="tags"
        @input="rebuildLink"
      />
    </div>
    <div>
      <label for="description">Description</label>
      <textarea
        id="description"
        class="description"
        placeholder="As a ... I want to ... so that ..."
        v-model="description"
        @input="rebuildLink"
      ></textarea>
    </div>
  </form>
  <hr />
  <footer>
    <a
      href="https://github.com/micgro42/phabTemplateBuilder"
      target="_blank"
    >Source</a>
    <span>
      Last built at: <time>{{ buildTime() }}</time>
    </span>
  </footer>
</template>

<style>
/* TODO: this import should not be needed */
@import "../node_modules/@wikimedia/codex/dist/codex.style.css";

.description {
  width: 100%;
  height: 50em;
}
</style>
