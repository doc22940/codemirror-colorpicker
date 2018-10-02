import UIElement from "../../../colorpicker/UIElement";
import GradientView from "./image/GradientView";
import ImageList from './image/ImageList';

export default class ImageControl extends UIElement {
    template () {
        return ` 
            <div class="control image-control">
                <div class="left">
                    <ImageLIst></ImageList> 
                </div>
                <div class="right">
                    <GradientView></GradientView>                      
                </div>

            </div>     
        `
   }  

   components () {
       return { GradientView, ImageList }
   }
}