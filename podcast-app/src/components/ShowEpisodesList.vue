<template>
  <v-card width="100%" class="seasonContainer" v-for="season in props.showData.seasons" :key="season.season">
    <div class="seasonInfo">
      <img :src="season.image" height="100">
      <v-card-title>Season {{ season.season }}</v-card-title>
      <v-chip>{{ season.episodes.length }} EPISODES</v-chip>
    </div>

    <v-list max-width>
      <v-list-item v-for="episode in season.episodes" :key="episode.episode">
        <v-list-item-title>
          <v-icon @click="toggleFavorite(season, episode)" v-if="episode.isFavorite" icon='mdi-heart'
            :key="filledHeartKey" />
          <v-icon @click="toggleFavorite(season, episode)" v-else icon='mdi-heart-outline' :key="emptyHeartKey" />
          <v-chip class="episodeChip">EPISODE {{ episode.episode }}</v-chip>
          {{ episode.title }}
        </v-list-item-title>
        <v-list-item-subtitle>
          <div class="episodePanel">
            <div>
              {{ episode.description }}
            </div>
            <div class="episodePanelButton">
              <v-btn icon="mdi-play" size="large" color="green" @click="episodeSelectedHandler(season, episode)"
                :data-episode="[episode.episode]" :data-season="[season.season]"></v-btn>
            </div>
          </div>
        </v-list-item-subtitle>
      </v-list-item>
    </v-list>
  </v-card>
</template>

<script setup>
import { ref } from 'vue'
import { storeToRefs } from 'pinia';
import { useAppStore } from '@/store/app';
import { supabase } from '@/clients/supabase';

const props = defineProps(['showData'])

let filledHeartKey = ref(0)
let emptyHeartKey = ref(1)

// const seasonsArray = reactive(props.showData.seasons)

const { currentlyPlaying } = storeToRefs(useAppStore())

const toggleFavorite = async (season, episode) => {
  try {
    // Check if the episode is already favorited
    if (episode.isFavorite) {
      // If it's favorited, remove it from the database 
      // Problem: removes items that need to keep timestamps for
      await supabase
        .from('favorites')
        .delete()
        .eq('showId', props.showData.id)
        .eq('season', season.season)
        .eq('episode', episode.episode);
      console.log("Removed fav")
    } else {
      const localUser = await supabase.auth.getSession()
      // If it's not favorited, add it to the database
      await supabase.from('favorites')
        .insert({
          user_email: localUser.data.session.user.email,
          showId: props.showData.id,
          show_name: props.showData.title,
          season: season.season,
          date_added: new Date(),
          last_updated: props.showData.updated,
          episode: episode.episode,
          episode_title: episode.title,
          episode_description: episode.description,
          season_image: season.image,
          file: episode.file,
          is_favorite: true,
          time_played: episode.timePlayed || 0,
        });
      console.log("Added fav")
    }

    // Update the isFavorite property in the episode object
    episode.isFavorite = !episode.isFavorite;
    filledHeartKey.value++
    emptyHeartKey.value++
  } catch (error) {
    console.error('Error toggling favorite:', error);
  }
};

const episodeSelectedHandler = async (season, episode) => {
  try {
    // If episode is already in database, get record from the database for start time
    const localUser = await supabase.auth.getSession()
    let time = 0
    let { data } = await supabase
      .from('favorites')
      .select('id, time_played') // can work off just the ID?
      .eq('showId', props.showData.id)
      .eq('season', season.season)
      .eq('episode', episode.episode)
    if (data.length > 0) {
      time = data[0].time_played
      console.log("Episode already in database")
    } else {
      // If it's not already in database, add it with time = 0
      await supabase.from('favorites')
        .insert({
          user_email: localUser.data.session.user.email,
          showId: props.showData.id,
          show_name: props.showData.title,
          season: season.season,
          date_added: episode.dateAdded || null,
          last_updated: props.showData.updated,
          episode: episode.episode,
          episode_title: episode.title,
          episode_description: episode.description,
          season_image: season.image,
          file: episode.file,
          is_favorite: episode.isFavorite || false,
          time_played: 0,
        });
      console.log("Episode added to database")
    }

    // Update the the currently playing value in the store
    currentlyPlaying.value.showId = props.showData.id
    currentlyPlaying.value.showTitle = props.showData.title
    currentlyPlaying.value.episodeTitle = episode.title
    currentlyPlaying.value.episode = episode.episode
    currentlyPlaying.value.season = season.season
    currentlyPlaying.value.file = episode.file
    currentlyPlaying.value.timePlayed = time // If is data, gets set from DB, otherwise is 0

    // currentlyPlaying.value.userEmail = localUser.data.session.user.email
    // currentlyPlaying.value.showId = props.showData.id
    // currentlyPlaying.value.showTitle =
    // currentlyPlaying.value.season =
    // currentlyPlaying.value.dateAdded =
    // currentlyPlaying.value.dateUpdated =
    // currentlyPlaying.value.episode =
    // currentlyPlaying.value.episodeTitle =
    // currentlyPlaying.value.episodeDescription =
    // currentlyPlaying.value.seasonImage =
    // currentlyPlaying.value.timePlayed =

  }
  catch (error) {
    console.error('Error adding listening history / loading currently playing:', error);
  }
};


// const episodeSelectedHandler = (event) => {

//   const currentEpisode = event.target.closest('[data-episode]').dataset.episode
//   const currentSeason = event.target.closest('[data-season]').dataset.season

//   currentlyPlaying.value.showId = props.showData.id
//   currentlyPlaying.value.showTitle = props.showData.title
//   currentlyPlaying.value.episodeTitle = props.showData.seasons[currentSeason - 1].episodes[currentEpisode - 1].title
//   currentlyPlaying.value.episode = currentEpisode
//   currentlyPlaying.value.file = props.showData.seasons[currentSeason - 1].episodes[currentEpisode - 1].file
//   currentlyPlaying.value.timePlayed = props.showData.seasons[currentSeason - 1].episodes[currentEpisode - 1].timePlayed || 0

//   return currentlyPlaying.value
// }

</script>

<style scoped>
.v-card-subtitle {
  margin-bottom: 0.8rem;
}

.seasonContainer {
  display: flex;
  margin: 2rem;
}

img {
  margin: 1rem;
}

.seasonInfo {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 15%;
}

.episodeChip {
  margin-left: 2rem;
  margin-right: 2rem;
}

.episodePanel {
  display: flex;
  align-items: center;
}

.episodePanelButton {
  margin-left: 24px;
}
</style>