export interface ListensPerDay {
  day: number;
  count: number;
  song_id: string;
  data: { name: string }[];
}

export interface TimeOfDay {
  hour: string;
  count: number;
}

export interface EntityAggregation {
  allTime: EntityCount[];
  year: EntityCount[];
  month: EntityCount[];
}

export interface Stats {
  songs: EntityAggregation;
  albums: EntityAggregation;
  timeListenedTo: TimeListenedTo[];
  uniqueSongs: UniqueEntity;
  uniqueAlbums: UniqueEntity;
  uniqueArtists: UniqueEntity;
}

export interface EntityCount {
  count: string;
  song_id: string;
  name: string;
  image_url: string;
}

export interface TimeListenedTo {
  time_of_day: string;
  count: string;
}

export interface UniqueEntity {
  year: number;
  month: number;
}
