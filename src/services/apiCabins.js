import { handleError } from "../utils/helpers";
import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");

  handleError(error);

  return data;
}

function getNameAndPath(obj) {
  const hasImagePath = obj.image?.startsWith?.(supabaseUrl);

  const name = `${Math.random().toString().slice(2, 6)}__${obj.image.name}`.replaceAll("/", "");
  const path = hasImagePath
    ? obj.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${name}`;

  return { name, path };
}

export async function createCabin(newCabin) {
  const { name: imageName, path: imagePath } = getNameAndPath(newCabin);

  // 1. create a new cabin
  const { data, error } = await supabase
    .from("cabins")
    .insert([{ ...newCabin, image: imagePath }])
    .select();

  handleError(error);

  // 2. Uplaod the image
  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);

  if (storageError) await supabase.from("cabins").delete().eq("id", data.id);

  return data;
}

export async function editCabin(cabin, id) {
  const { name: imageName, path: imagePath } = getNameAndPath(cabin, id);

  const { data, error } = await supabase
    .from("cabins")
    .update({ ...cabin, image: imagePath })
    .eq("id", id)
    .select();

  handleError(error);

  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, cabin.image);

  handleError(storageError);

  return data;
}

export async function deleteCabin(id) {
  const { error } = await supabase.from("cabins").delete().eq("id", id);
  handleError(error);
}
