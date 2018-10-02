
import GradientAngle from '../../view/GradientAngle'
import GradientPosition from '../../view/GradientPosition' 
import PredefinedLinearGradientAngle from '../../view/PredefinedLinearGradientAngle'
import PredefinedRadialGradientPosition from '../../view/PredefinedRadialGradientPosition'
import UIElement from '../../../../colorpicker/UIElement';
import GradientType from './GradientType';
import GradientLayersMenu from './GradientLayersMenu'; 


export default class GradientView extends UIElement {

    template () {
        return `
            <div class='gradient-view'>
                <GradientLayersMenu></GradientLayersMenu>
                <div class="gradient-color-view-container"></div>
                <div class="gradient-color-view" ref="$colorview"></div>
                <div class="gradient-color-view" ref="$colorviewOnly"></div>
                <GradientAngle></GradientAngle>   
                <GradientPosition></GradientPosition>             
                <PredefinedLinearGradientAngle></PredefinedLinearGradientAngle>
                <PredefinedRadialGradientPosition></PredefinedRadialGradientPosition>
                <GradientType></GradientType>                
            </div>
        `
    } 

    components () {
        return { GradientAngle, GradientPosition, PredefinedLinearGradientAngle, PredefinedRadialGradientPosition, GradientType, GradientLayersMenu }
    }

    refresh () {
        this.setBackgroundColor()
    }
 
    setBackgroundColor() {

        if (this.read('/tool/get', 'guide.only')) {
            this.refs.$colorview.hide()
            this.refs.$colorviewOnly.show();
            this.refs.$colorviewOnly.css(this.read('/image/toCSS'))
        } else {
            this.refs.$colorviewOnly.hide(); 
            this.refs.$colorview.show();
            this.refs.$colorview.css(this.read('/layer/toCSS'))
        }

    }

    '@changeLayer' () {
        this.refresh() 
    }

    '@initLayer' () { this.refresh() }    

    '@changeTool' () {
        this.refresh()
    }
}