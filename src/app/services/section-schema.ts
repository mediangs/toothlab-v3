/**
 * Created by Lee Jongki on 2017-02-10.
 * generated using :
 * http://schemaguru.snowplowanalytics.com/#
 */


export interface SectionModelSchema {
  model: {
    crv_name: string,
    pre_crv_length: number,
    pts_of_pre_crv: Array<Array<number>>,
    pts_of_pst_crv: Array<Array<number>>,
    pts_of_opp_pre_crv: Array<Array<number>>,
    median_major_axis_vector: Array<number>
  },
  sections: Array<SectionSchema>
}

export interface DentinThicknessSchema {
  p_body : Array<number>,
  p_canal : Array<number>,
  thickness : number,
  angle : number
}

export interface SectionSchema{
  section : number,

  bdy_major_outline : Array<Array<number>>,
  cnl_pre_major_outline : Array<Array<number>>,
  cnl_pst_major_outline : Array<Array<number>>,
  cnl_pst_major_p2_outline : Array<Array<number>>,

  cnl_pre_opp_major_outline : Array<Array<number>>,
  cnl_pst_opp_major_outline : Array<Array<number>>,

  pre_mindist : any, // load후 object 로 변환,
  pst_mindist : any, //load후 object 로 변환,

  pre_mindist_line : Array<Array<number>>,  //Data load후 추가함 [pre_mindist.p_body, pre_mindist.p_canal]
  pst_mindist_line : Array<Array<number>>,  //

  cnl_transportation : any, //load후 object 로 변환,
  cnl_straightened : any,
  cnl_straightening : any,

  cnl_pre_narrow : any,
  cnl_pst_narrow: any,

  cnl_pre_wide : any,
  cnl_pst_wide : any,

  cwt_ratio : number,
  area_cnl_pst : number,
  area_cnl_pre : number,

  cnl_pre_major_outline_exist : boolean,
  tangential_CH_pt_at_pst_crv : Array<number>,
  pt_at_pst_crv : Array<number>,
  CH_pt_at_pst_crv : Array<number>,
  major_axis_vector : Array<number>,
  median_major_axis_used : boolean,
  pt_at_opp_pre_crv : Array<number>,
  t_vector_at_pre_crv : Array<number>,
  tangential_CH_pt_at_CH_axis : Array<number>,
  bdy_major_outline_exist : boolean,
  pt_at_pre_crv : Array<number>,
  pt_cnl_pre_cwt : Array<number>,
  major_axis_t_vector : Array<number>,
  cnl_pst_major_outline_exist: boolean,
  CH_pt_at_CH_axis : Array<number>,
}


export interface  ViewSectionSchema{
  bdy_major_outline? : any,
  cnl_pre_major_outline? : any,
  cnl_pst_major_outline? : any,
  cnl_pre_opp_major_outline? : any,
}
