import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

//Provider
import { NewsProvider } from './../../providers/news/news';

//model
import { News } from './../../models/news/news';
/**
 * Generated class for the NewsDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-news-detail',
  templateUrl: 'news-detail.html',
})
export class NewsDetailPage {
  
  newsDocument:News;
  newsDocumentId;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private newsProvider: NewsProvider
    
    ) {
  }

  ionViewDidLoad() {
    this.newsDocumentId = this.navParams.get('id');
    this.getNewsDocument(this.newsDocumentId);
  }

  getNewsDocument(newsDocumentId){
    this.newsProvider.getNewsDocument(newsDocumentId).subscribe(newsDocument => {
      this.newsDocument = newsDocument;
    }, error => {
      this.navCtrl.pop();
    });
  }

}
