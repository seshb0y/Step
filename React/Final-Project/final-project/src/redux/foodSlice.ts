import { createSlice } from "@reduxjs/toolkit";
import { fetchGetFood } from "./operations";

interface FoodState {
  food: Array<{
    id: number;
    name: string;
    price: number;
    description: string;
    theme: string;
    image: string;
  }>;
  isLoading: boolean;
  error: string | undefined;
}

const initialState: FoodState = {
  food: [
    // {
    //     id: 1,
    //   name: "Green Goddess Chicken Salad",
    //   price: 32,
    //   description:
    //     "It is a non vegetarian salad which consists of the green goddess dressing mixed with chicken, peppers, olives and celery",
    //   theme: "orange",
    //   image:
    //     "https://s3-alpha-sig.figma.com/img/f1cc/7e8a/e9df498957f2d3c23586a9edad79c926?Expires=1737936000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Lr2FJZuwT9giDWb5GUx~Y5iogyFr1VbvfQlkGi15aFj6O56OBqulziU66bIoyKdG3a1IjOwPOBA8Is0zLInmuc3S2YzDvxwEQw17ALnFnVWfK6o3Gqs-wJjV09sr-mkt05ptR7-m3dfXWb4nbO8jfADbYskES5hEG-DNHYt2Xi5ZdaYaMSP0E5-SaNEG~uenr5FHsz7BbYxACjhpL8LvVBpLdcwBMjZxzVGyCyi9ZbbQ3AHfxS4jyU0rgd1~AjYgTxUHELNQ-BurQQ40OFqJ1ceaGKAH-F6Dkaay6zg8RPsqMn~ZSvDQDKlw4lpMQD4eAx5Y1iieRUWCEldvmfWh7Q__",
    // },
    // {
    //     id: 2,
    //   name: "Asian Cucumber Salad",
    //   price: 35,
    //   description:
    //     "Asian Cucumber Salad Recipe made with crunchy cucumber, onion, rice wine vinegar, and a few secret ingredients!",
    //   theme: "green",
    //   image:
    //     "https://s3-alpha-sig.figma.com/img/0c98/ff41/7c3dbec6c765fa96f60472f7d36950c2?Expires=1737936000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Y1nVx8T~AFuWW~BRrzxWeXUIqD7NtoWAVSnnkroMQHIOtc5OuM4FQb-Vs2ffKw~WbF3lT1gDENrm9G0tOophoqrHTBQOaV~v0NCmcRGZsKlVEQmTIYq9kq-yBREZUutF-5ticUdn7mpm3XwRoEELbiS37B-54wYPO0wTG46HCuGl7kj~bl8Xx7vUvccY3Q55BHZNlAxSBtYfulgou4lLTXEDVaJzYSdDPRpqiGtfHolSCPYfAbCjibS2gaL4eTxEZ48FeLHLfnzUc-O4mvZzVbyAeKxokOGpmzHZ69yO6y6z8v3xlZgdb8rBC1Qv0YaixVR3fT2dWYl21OancK~Qfw__",
    // },
    // {
    //     id: 3,
    //   name: "Baked Salmon Salad",
    //   price: 38,
    //   description:
    //     "This dish is a popular choice for a healthy and balanced diet, as it combines protein(salmon), vitamins and fiber(vegetables)",
    //   theme: "red",
    //   image:
    //     "https://s3-alpha-sig.figma.com/img/482b/0d4e/f08e4621060884a4a5a8e93244577851?Expires=1737936000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=dCEanlvOAaAP3VULklrS9ZrzGBZIx8vMp3Z4qXjasghTx7X-GYoV9gneCP5y-T1ju2cRfkJJYhUpUnsfjA~6YnydZJVdJB5hot1VdBfbZuBcsovG5CTU63XXAAaE8iVZ-mpIJ4x0r52YMmSUvgllrw1FS1ZDAkt5uTwq9He76egaTxqwBI4AmMc3oFiSjB7h~eEkeD~BAZaE7VKqfrKR5RutL64bgDB9NhNUI8WHAZ2JIrFQaq4Cu0O9RGLVzvEEBHaXaGYfxfaizl4lKM87JkKvIu3-OpC1CoDutX8EUjoBWTjlj~NWcT8JhU3HxjwpwWcQlfBITok0cQyJRXmWrA__",
    // },
    // {
    //     id: 4,
    //   name: "Ravioli",
    //   price: 30,
    //   description:
    //     "This dish is traditional for Italian cuisine and is often served as a main course. Ravioli can be filled with various ingredients, such as meat, cheese, vegetables or mushrooms",
    //   theme: "wheat",
    //   image:
    //     "https://s3-alpha-sig.figma.com/img/f955/20d4/4e75d1032a643cae2cc15a35a3da1ae2?Expires=1737936000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=MmCFHRhsL8AQqCUPVng6Bl0E14ypZPdAErlc6clUlxxcwhtPCdZgYuzk0WxNeg52DKqHCb1W6fc2k~XwQgZkpFTaV2R6D8rwSglPnOtukG7jjDwEuCacJNklzeR3c~aeyoTeViIimIYj~Mk6V8ieIEBhGpdnUObtDiiEAWa9knv~GbmsUbNFEVkFx5c7eGSD7t1xsSTfNcRZqiklw3Ib5IvzGLYnYFjavb9QVOIE-RUOlWtrhht60SNTPKzZWIPt45~VP-EcAnuFOCff4U~sq~vO-IKQZxiU3ok3Rattofi2SwsfOH00zyXAHZMC1PkuLX9G6bz~LXxQLofMr5ZYPQ__",
    // },
    // {
    //     id: 5,
    //   name: "Citrus Salad With Radishes And Microgreens",
    //   price: 20,
    //   description:
    //     "This refreshing salad is a perfect combination of bright flavors and textures that will not leave any gourmet indifferent. It is based on juicy citrus slices, which give the dish a rich aroma and sourness",
    //   theme: "red",
    //   image:
    //     "https://s3-alpha-sig.figma.com/img/76c5/6853/29027ed1ee373315919cb78a65d36701?Expires=1737936000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=JZBU-UMWU~4HDr3r17Jxoe4qZ5fydoVgmB2~R16FvmuZbmOS9844X-YSXvzIz583uz1hDFZIwDiyCocU0u7zV5wUOYEYrPVOtOmnCy3jllwprB1-SjMyw8l1JfTsNW2zO6~bTVA4Auo78sKzaWIvctvRLcaxMizq5q-qMq~KXnjqNvM~8j5GokJmKvgKyfBD~qulWgZKRq1UZ1yp4vyTplFB3uI7iqn8PBLdNBQ9Zp9W0Ygdh6aPhVDnXZaTg184X~Rfdet07Qx2Nmtwwv~7fO6ajo0b~G~rVM5m-e2Es8ZKFOyMvEtHxBIRPBiLhbQ1yMFz26H3BSHKBq733wu3dA__",
    // },
  ],
  isLoading: true,
  error: undefined,
};

const foodSlice = createSlice({
  name: "food",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGetFood.pending, (state) => {
        state.isLoading = true;
        state.error = undefined;
      })
      .addCase(fetchGetFood.fulfilled, (state, action) => {
        state.isLoading = false;
        state.food = action.payload;
      })
      .addCase(fetchGetFood.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

// export const foodReducer = foodSlice.reducer

export default foodSlice.reducer;
