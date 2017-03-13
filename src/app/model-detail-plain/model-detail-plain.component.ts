import {Component, OnInit, ElementRef, Renderer} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {SpecimenService} from "../services/specimen.service";
import {Specimen, X3dModel} from "../services/specimen-schema";
import {Http} from "@angular/http";
import {SectionModelSchema, ViewSectionSchema, DentinThicknessSchema} from "../services/section-schema";
import {ChartService} from "../services/chart.service";
import {namedlist} from "../shared/utils";

declare let x3dom: any;
declare let d3: any;


@Component({
  selector: 'app-model-detail-plain',
  templateUrl: './model-detail-plain.component.html',
  styleUrls: ['./model-detail-plain.component.css']
})

export class ModelDetailPlainComponent implements OnInit {

  private title = "Root canal anatomy detail";
  private zoomed = false;

  private specimen: Specimen;
  private specimenId: string;

  private chartOptions;
  private chartData;

  color: string = '#0ff';
  modelWidth = 100;
  modelHeight = 100;

  sectionData: SectionModelSchema; //JSON
  coordIndex : ViewSectionSchema = {} ;
  coordPoints: ViewSectionSchema = {} ;

  currentSection:number = 0;
  sectionMax : number;
  sectionMin : number;
  sectionStep : number;


  constructor(private specimenService: SpecimenService,
              private route: ActivatedRoute,
              private router: Router,
              private renderer: Renderer,
              private chartService : ChartService,
              private el: ElementRef,
              private http: Http) {
    chartService.activeSection$.subscribe(
      section => {
        this.currentSection = section;
      }
    );
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.specimenId = params['id'];
      this.specimen = this.specimenService.getSpecimenById(this.specimenId);
    });


    //color-picker사용을 위해 소문자로 바꾸어야함 ??
    this.specimen.x3dModels.forEach(el => {
      el.color = el.color.toLowerCase();
    });

    x3dom.reload();

    this.specimenService.getSectionData(this.specimen)
      .subscribe(data => {

        let DentinThickness = namedlist(['p_body', 'p_canal', 'thickness', 'angle']);
        let CanalDimension = namedlist(['p1', 'p2', 'width']);
        let FileMovement = namedlist(['vector', 'angle']);

        data.sections.forEach(d=>{
          d.pre_mindist = DentinThickness(d.pre_mindist);
          d.pst_mindist = DentinThickness(d.pst_mindist);
          d.pre_mindist_line = [d.pre_mindist.p_body, d.pre_mindist.p_canal];
          d.pst_mindist_line = [d.pst_mindist.p_body, d.pst_mindist.p_canal];

          d.cnl_pre_narrow = CanalDimension(d.cnl_pre_narrow);
          d.cnl_pst_narrow = CanalDimension(d.cnl_pst_narrow);
          d.cnl_pre_wide = CanalDimension(d.cnl_pre_wide);
          d.cnl_pst_wide = CanalDimension(d.cnl_pst_wide);

          d.cnl_transportation = FileMovement(d.cnl_transportation);
          d.cnl_straightened = FileMovement(d.cnl_straightened);
          d.cnl_straightening = FileMovement(d.cnl_straightening);

        });

        this.sectionData = data;
        this.sectionMax = Math.max.apply(Math, data.sections.map(o=>o.section));
        this.sectionMin = Math.min.apply(Math, data.sections.map(o=>o.section));
        this.sectionStep = (this.sectionMax - this.sectionMin) / (data.sections.length -1);

        this.setChartData(data);
      });

    this.setChartOptions();

  }

  setChartData(data : SectionModelSchema){

    this.chartData = [
      {
        values: data.sections.map(d=> [d.section, d.pre_mindist.thickness]),   //values - represents the array of {x,y} data points
        key: 'Thinnest dentin(pre)', //key  - the name of the series.
        color: '#ff7f0e'  //color - optional: choose your own line color.
      },

      {
        values: data.sections.map(d=> [d.section, d.pst_mindist.thickness]),
        key: 'Thinnest dentin(post)',
        color: '#2ca02c'
      },

      {
        values: data.sections.map(d=> [d.section, d.cwt_ratio]),
        key: 'Canal wall thinning(%)',
      },

      {
        values: data.sections.map(d=> [d.section, d.area_cnl_pre]),
        key: 'Canal area, Pre (mm2)',
      },

      {
        values: data.sections.map(d=> [d.section, d.area_cnl_pst]),
        key: 'Canal area, Post (mm2)',
      }
    ];
  }

  setChartOptions(){

    this.chartOptions = {
      chart: {
        type: 'lineChart',
        height: 200,
        margin : {
          top: 20,
          right: 40,
          bottom: 40,
          left: 80
        },
        x: function(d){ return d[0]; },
        y: function(d){ return d[1]; },
        useInteractiveGuideline: true,
        xAxis: {
          axisLabel: 'Distance from apex(mm)'
        },
        yAxis: {
          axisLabel: 'Dentin thickness (mm)',
          tickFormat: function(d){
            return d3.format('.02f')(d);
          },
          axisLabelDistance: -1
        },
        lines: {
          dispatch: {
            elementClick: function(e) {
              console.log('clicked!');
              console.log(e);
              console.log();
              var point = e[0].point[0];


              //this.chartService.getActiveSection(point);

              //this.updateSectionOutline(e[0].point[0]);
            },
            elementMouseover: function(e){
              console.log('mouse over');
              console.log(e);
            },
            elementDblClick: function(e){
              console.log('mouse out!');
              console.log(e);
            }

          }
        }
      }
    };
  }

  updateModelColor(x3d) {
    var el = document.getElementById(x3d.name + '__MA');
    if (el) {
      this.renderer.setElementAttribute(el, 'diffuseColor', x3d.color);
    }
  }

  restoreModelStatus() {
    this.specimen.x3dModels.forEach(el => {
      this.renderer.setElementAttribute(
        document.getElementById(el.name + '__MA'),
        'transparency', el.transparency.toString());

      this.renderer.setElementAttribute(
        document.getElementById(el.name + '__MA'),
        'diffuseColor', el.color);

    });
  }

  setTransparency(element: X3dModel, transparency: number) {
    element.prevTransparency = element.transparency;
    element.transparency = transparency;
    this.renderer.setElementAttribute(
      document.getElementById(element.name + '__MA'),
      'transparency', element.transparency.toString());
  }

  toggleModel(x3d : X3dModel, checked : boolean){
    this.setTransparency(x3d, checked ? x3d.prevTransparency : 1);
  }

  updateSectionOutline(sectionLevel){
    this.currentSection = sectionLevel;
    this.setIndexedLineSet(this.currentSection);
  }

  toggleZoom() {

    var button = document.getElementById('zoom-button');
    if (this.zoomed) {
      button.style.backgroundColor = "#202021";
    } else {
      button.style.backgroundColor = "#c23621";
    }

    this.zoomed = !this.zoomed;

  }


  setIndexedLineSet(sectionLevel) {
    var keys_outline = ['bdy_major_outline',
                'cnl_pre_major_outline',
                'cnl_pst_major_outline',
                'cnl_pre_opp_major_outline',
                'pre_mindist_line',
                'pst_mindist_line'];


    // find nearest section level
    var section = this.sectionData.sections
      .reduce((prev, curr) =>
        Math.abs(curr.section - sectionLevel) < Math.abs(prev.section - sectionLevel) ? curr : prev);

    keys_outline.forEach(key => {
      var outline = section[key];
      this.coordPoints[key] = [].concat.apply([], outline);
      this.coordIndex[key]  = Object.keys(outline).map(x=>Number(x)).concat(0);
    });


  }

  gotoAnatomy() {
    this.router.navigate(['/specimen-list']);
  }

  reload() {
    this.restoreModelStatus()
  }
}
