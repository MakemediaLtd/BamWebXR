/* global AFRAME */
AFRAME.registerComponent('info-panel', {
  init: function () {
    var buttonEls = document.querySelectorAll('.menu-button');
    var fadeBackgroundEl = this.fadeBackgroundEl = document.querySelector('#fadeBackground');

    this.movieImageEl;
    this.movieTitleEl = document.querySelector('#movieTitle');
    this.movieDescriptionEl = document.querySelector('#movieDescription');
	
	this.currentSection;
	this.currentSectionVideoIndex = 0;
	this._360VideoPlayer = document.querySelector('#_360Player');
	
	
	this.UIMenu = document.querySelector('#menu');
	this.InfoPanel = document.querySelector('#infoPanel');
	
	this.Cam = document.querySelector('#cam');
	this.wrapScene = document.querySelector('#wrapScene');
	
	this.playerMenu = doctype.querySelector('#PlayerMenu');
	

    this.movieInfo = {
      karigurashiButton: {
        title: 'The Secret World of Arrietty (2010)',
        imgEl: document.querySelector('#karigurashiMovieImage'),
        description: 'Based on the 1952 novel The Borrowers by Mary Norton, an English author of children\'s books, about a family of tiny people who live secretly in the walls and floors of a typical household, borrowing items from humans to survive.'
      },
      kazetachinuButton: {
        title: 'The Wind Rises (2013)',
        imgEl: document.querySelector('#kazetachinuMovieImage'),
        description: 'The Wind Rises is a fictionalised biographical film of Jiro Horikoshi (1903, 1982), designer of the Mitsubishi A5M fighter aircraft and its successor, the Mitsubishi A6M Zero, used by the Empire of Japan during World War II. The film is adapted from Miyazaki\'s manga of the same name, which was in turn loosely based on both the 1937 novel The Wind Has Risen by Tatsuo Hori and the life of Jiro Horikoshi.'
      },
      ponyoButton: {
        title: 'Ponyo (2003)',
        imgEl: document.querySelector('#ponyoMovieImage'),
        description: 'It is the eighth film Miyazaki directed for Studio Ghibli, and his tenth overall. The film tells the story of Ponyo (Nara), a goldfish who escapes from the ocean and is rescued by a five-year-old human boy, Sōsuke (Doi) after she is washed ashore while trapped in a glass jar.'
      }
    };
	
	this.bamXrInfo = {
		LondonCityAirportBTN:{
			title:'London City Airport',
			description: 'BAM Nuttall and BAM International have jointly been awarded a contract for £85m to construct a 75,000m² concrete deck extension providing a new taxiway and additional aircraft parking.  The project is part of a £480m development programme for the airport and involves over 1000 steel cased concrete piles, installation of over 6000 precast sections and pouring over 43,500m³ of concrete.',
			vidSrc: 'Video/LondonCityAirport/Airport_01.mp4',
			bannerImg: 'ProjectImages/London-City-Airport-2.jpg',
			imgEl: document.querySelector('#MovieImage')
			
		},
		TidwayBTN:{
			title:'Thames Tideway West',
			description: 'BMB, a Joint Venture between BAM Nuttall, Morgan Sindall and Balfour Beatty was awarded the £416m contract to construct the 6km west section of the Thames Tideway Tunnel.  The Tunnel’s purpose is to prevent pollution from the city’s sewerage network being discharged directly into the Thames estimated in tens of millions of tonnes per year.  The overall cost of the Tideway project is £4.9bn.',
			vidSrc: 'Video/LondonCityAirport/Airport_01.mp4',
			bannerImg: 'ProjectImages/TTW.jpg',
			imgEl: document.querySelector('#MovieImage')
			
		},
		HPCBTN:{
			title:'Hinkley Point C',
			description: 'The first new nuclear power station to be built in the UK in over 20 years; Hinkley Point C will provide low-carbon electricity for around 6 million homes, create thousands of jobs and bring lasting benefits to the UK economy. On a site that is the size of 245 football pitches, the KBJV team are working on site preparation and earthworks stages of the project.',
			vidSrc: 
			[
				'output',
				'Airport_02'
			],
			bannerImg: 'ProjectImages/hinkley_point.jpg',
			imgEl: document.querySelector('#MovieImage')
			
		},
		BostonBarrierBTN:{
			title:'Boston Barrier',
			description: 'BMJV, a Joint Venture between BAM Nuttall and Mott MacDonald were awarded the contract for the design and construction of flood defence works including the movable gate across the River Haven protecting over 14,000 homes.  Boston has been susceptible to flooding with a significant tidal event in 2013 causing damage to 100s of homes.  The new barrier will protect the town from tidal surge flooding for years to come.',
			vidSrc: 
			[
				'output',
				//'Boston_01_2mbits',
				'output'
				//'output',
				//'Boston_02_2mbits',
				//'Boston_03_2mbits'
			],
			bannerImg: 'ProjectImages/Boston Barrier.jpg',
			imgEl: document.querySelector('#MovieImage')
			
		}
		
	}

    this.onMenuButtonClick = this.onMenuButtonClick.bind(this);
    this.onBackgroundClick = this.onBackgroundClick.bind(this);
	this.onPlay360Click = this.onPlay360Click.bind(this);
	this.on360VideoEnded = this.on360VideoEnded.bind(this);
	
	this.play360Button = document.querySelector('#play360Button');
	play360Button.addEventListener('click', this.onPlay360Click);
	
	this._360VideoPlayer.addEventListener('materialvideoended', this.on360VideoEnded);
	

	
    //this.backgroundEl = document.querySelector('#background');
    
	
	for (var i = 0; i < buttonEls.length; ++i) {
      buttonEls[i].addEventListener('click', this.onMenuButtonClick);
    }
	
	
  // this.backgroundEl.addEventListener('click', this.onBackgroundClick);
   this.el.object3D.renderOrder = 9999999;
   this.el.object3D.depthTest = false;
    fadeBackgroundEl.object3D.renderOrder = 9;
    fadeBackgroundEl.getObject3D('mesh').material.depthTest = false;
  },

  onMenuButtonClick: function (evt) {
    var movieInfo = this.bamXrInfo[evt.currentTarget.id];
	
	this.currentSection = movieInfo;
	
	console.log(evt.currentTarget.id);

    //this.backgroundEl.object3D.scale.set(1, 1, 1);

    this.el.object3D.scale.set(1, 1, 1);
    if (AFRAME.utils.device.isMobile()) { this.el.object3D.scale.set(1.4, 1.4, 1.4); }
    this.el.object3D.visible = true;
    this.fadeBackgroundEl.object3D.visible = true;

   if (this.movieImageEl) { this.movieImageEl.object3D.visible = false; }
    this.movieImageEl = movieInfo.imgEl;
    this.movieImageEl.object3D.visible = true;
	this.movieImageEl.setAttribute('material', 'src', movieInfo.bannerImg);

    this.movieTitleEl.setAttribute('text', 'value', movieInfo.title);
    this.movieDescriptionEl.setAttribute('text', 'value', movieInfo.description);
  },


// change this to a 'close' button?

  onBackgroundClick: function (evt) {
   // this.backgroundEl.object3D.scale.set(0.001, 0.001, 0.001);
    this.el.object3D.scale.set(0.001, 0.001, 0.001);
    this.el.object3D.visible = false;
    this.fadeBackgroundEl.object3D.visible = false;
	
  },
  
  onPlay360Click: function(evt){
	  
	  console.log("Play 360 pressed");
	  this._360VideoPlayer.object3D.visible = true;
	  
	 // console.log(this.currentSection.vidSrc[this.currentSectionVideoIndex]);
	  console.log('harrisonp.xyz/WebXR/' + this.currentSection.vidSrc[this.currentSectionVideoIndex]);
	 // this.videoAsset.setAttribute('src', 'http://harrisonp.xyz/WebXR/' + this.currentSection.vidSrc[this.currentSectionVideoIndex]);
	 // this.videoAsset.play();
	
		
		this.playCurrentVideo();
	  
	  this.fadeBackgroundEl.object3D.visible = false;
	  
	  
	  
	  this.UIMenu.setAttribute('visible',false);
	  this.InfoPanel.object3D.visible = false;
	
	  
  },
  
  on360VideoEnded: function(evt) {
	  
	  console.log("video ended?");
	  
	  if(this.currentSectionVideoIndex < this.currentSection.vidSrc.length - 1)
	  {
		  this.currentSectionVideoIndex ++;
		  
		  
		 this.playCurrentVideo();
		  
	  }
	  else
	  {
		  this.currentSectionVideoIndex = 0;
		  
		  this.GoBackToMainMenu();
		  
	  }
		  
	  
	  
	  
  },
  
  playCurrentVideo: function()
  {
	  console.log("Play current video");
	  
	   var id = this.currentSection.vidSrc[this.currentSectionVideoIndex];
	
	 
			this._360VideoPlayer.setAttribute('material','src', "#"+id);
	 
			var video = document.querySelector("#"+id);
			
			video.play();
		  
  },
  
  GoBackToMainMenu: function()
  {
	  
	    this._360VideoPlayer.object3D.visible = false;
		  
	  this.UIMenu.setAttribute('visible',true);
	  
	  var camRotY =  this.Cam.object3D.rotation.y;
	  
	  
	  //console.log(camRotY);
	 

	  
	  
	  
	  this.wrapScene.object3D.rotation.set(
					0,
					camRotY,
					0,
				);
		
	  
  }
  
});




 