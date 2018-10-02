import UIElement from "../../../../colorpicker/UIElement";
import Icon from "../../common/Icon";
 
export default class ImageList extends UIElement {

    template () { 
        return `
            <div class='image-list-container'>
                <div class="tools">                                
                    <button type="button" ref="$createImageButton">+</button>
                    <span class="divider">|</span>
                    <button type="button" class="first" ref="$first" title="move layer to first">&lt;&lt;</button>                  
                    <button type="button" class="prev" ref="$left" title="move layer to prev">&lt;</button>            
                    <button type="button" class="next" ref="$right" title="move layer to next">&gt;</button>
                    <button type="button" class="last" ref="$last" title="move layer to last">&gt;&gt;</button>
                    
                </div>            
                <div class="image-list" ref="$imageList"></div>
            </div>
        `
    }

    'load $imageList' () {
        var list = this.read('/image/list')

        return  `<div>${list.map((image, index) => {

                    var selected = image.selected ? 'selected' : '' 
                    return `
                        <div class='image-item ${selected}' data-index="${index}">
                            <div class="image-item-view-container">
                                <div class="image-item-view"  style='${this.read('/image/toString', image)}' ref="$image${index}"></div>
                            </div>
                            <div class="image-item-check" data-index="${index}">
                                ${Icon.CHECK}
                            </div>
                            <div class="image-item-visible ${image.visible ? 'on' : ''}" data-index="${index}">
                                ${Icon.VISIBILITY}
                                ${Icon.VISIBILITY_OFF}
                            </div>                            
                            <div class="image-item-delete" data-index="${index}">
                                ${Icon.DELETE}
                            </div>
                        </div>` 
                }).join('')}</div>`
    }

    refresh () {
        this.load()
    }

    '@changeLayer' () {
        this.refresh()
    }

    '@initLayer' () { this.refresh() }    

    '@changeColor' (c) {
        if (this.read('/image/get', 'type') == 'static') {
            var color = this.read('/tool/get', 'color');
            this.dispatch('/image/change', { color })
            this.refresh();
        }
    }

    'click $createImageButton' (e) {
        this.dispatch('/image/add')
        this.refresh();
    }

    'click $imageList .image-item-visible' (e) {
        var index = e.$delegateTarget.attr('data-index')
        this.dispatch('/image/toggle/visible', +index);

        this.refresh();
    }

    'click $imageList .image-item-delete' (e) {
        var index = e.$delegateTarget.attr('data-index')
        this.dispatch('/image/remove', +index);

        this.refresh();
    }    

    'click.self $imageList .image-item' (e) {
        var index = e.$delegateTarget.attr('data-index')
        this.dispatch('/image/select', +index);

        this.refresh();
    }

}