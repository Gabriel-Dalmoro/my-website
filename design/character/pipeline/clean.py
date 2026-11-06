import bpy, sys, os
S=sys.argv[1]
bpy.ops.wm.read_factory_settings(use_empty=True)
bpy.ops.import_scene.gltf(filepath=S+'/char/raw.glb')
o=[x for x in bpy.context.scene.objects if x.type=='MESH'][0]
bpy.context.view_layer.objects.active=o; o.select_set(True)
o.name='Gabriel'; o.data.name='Gabriel'
# merge doubles, then decimate
m=o.modifiers.new('dec','DECIMATE'); m.ratio=45000/len(o.data.polygons); m.use_collapse_triangulate=True; bpy.ops.object.modifier_apply(modifier='dec')
bpy.ops.object.shade_smooth()
# feet on ground, centered, 1.75 m tall
bpy.ops.object.transform_apply(location=True, rotation=True, scale=True)
zs=[v.co.z for v in o.data.vertices]; h=max(zs)-min(zs)
xs=[v.co.x for v in o.data.vertices]; ys=[v.co.y for v in o.data.vertices]
cx=(min(xs)+max(xs))/2; cy=(min(ys)+max(ys))/2; mz=min(zs)
for v in o.data.vertices: v.co.x-=cx; v.co.y-=cy; v.co.z-=mz
o.scale=(1.75/h,)*3; bpy.ops.object.transform_apply(scale=True)
# shrink texture
for img in bpy.data.images:
    if img.size[0]>1024: img.scale(1024,1024)
    img.filepath_raw=S+'/char/gabriel_tex.png'; img.file_format='PNG'; img.save()
print('tris', len(o.data.polygons), 'verts', len(o.data.vertices))
bpy.ops.export_scene.fbx(filepath=S+'/char/gabriel_for_mixamo.fbx', use_selection=True, path_mode='COPY', embed_textures=True, apply_unit_scale=True, axis_forward='-Z', axis_up='Y')
bpy.ops.export_scene.gltf(filepath=S+'/char/gabriel_clean.glb', use_selection=True, export_image_format='JPEG')
